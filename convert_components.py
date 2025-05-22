from pathlib import Path
import re
import shutil

color_map = {
    "head": {
        "skinColor": ["#B28B67", "#997659"],
        "primaryColor": ["#191847", "#2C2C2C"],  # Hair
        "secondaryColor": [
            "#89C5CC",
            "#8991DC",
            "#FF9B21",
            "#5C63AB",
            "#FF9B21",
        ],  # Wraps
    },
    "torso": {
        "skinColor": ["#B28B67", "#997659"],
        "primaryColor": [
            "#FF9B21",
            "#2F3676",
            "#FF4133",
            "#DDE3E9",
            "#C5CFD6",
            "#1F28CF",
            "#89C5CC",
            "#C1DEE2",
        ],  # Jackets, etc.
        "primaryColorShaded": [
            "#69A1AC",
            "#E87613",
            "#191847",
            "#DB2721",
            "#C5CFD6",
            "#AFB9C5",
            "#2026A2",
        ],
        "secondaryColor": ["#323337", "#DDE3E9", "#F2F2F2", "#191847"],
    },
    "standing": {
        "skinColor": ["#B28B67"],
        "skinColorShaded": ["#997659"],
        "primaryColor": ["#2B44FF", "#89C5CC", "#FF4133", "#2F3676"],
        "primaryColorShaded": [
            "#1F28CF",
            "#69A1AC",
            "#DB2721",
            "#191847",
            "#2F3676",
            "#5C63AB",
        ],
        "secondaryColor": [
            "#191847",
            "#E4E4E4",
            "#5C63AB",
        ],
    },
    "sitting": {
        "skinColor": ["#B28B67"],
        "primaryColor": ["#5C63AB", "#2B44FF"],
        "primaryColorShaded": [
            "#1F28CF",
            "#2F3676",
        ],
        "secondaryColor": ["#E4E4E4"],
        "tertiaryColor": ["#2F3676", "#C5CFD6"],
        "tertiaryColorShaded": ["#191847"],
    },
}


def extract_svg_content(js_content):
    # Find the content between the arrow function parentheses or createElement calls
    component_match = re.search(
        r'(?:props\s*=>\s*\(|React\.createElement\("g",\s*{[^}]*},)([\s\S]*?)(?:\);?\s*$|\);\s*export)',
        js_content,
    )
    if component_match:
        content = component_match.group(1).strip()
        # If it's React.createElement style, convert it to JSX
        if content.startswith("React.createElement"):
            # This is a placeholder - we'd need more sophisticated conversion for createElement
            print("Warning: createElement conversion not yet implemented")
        return content
    return None


def get_used_colors(svg_content, component_type="head"):
    """Determine which colors are actually used in the SVG content"""
    used_colors = {
        "skinColor": "#B28B67" in svg_content,
        "shadedSkinColor": "#997659" in svg_content,
        "hairColor": "#191847" in svg_content if component_type == "head" else False,
        "primaryColor": any(
            color in svg_content
            for color in ["#7331FF", "#5C63AB", "#2F3676", "#2B44FF"]
        ),
        "shadedPrimaryColor": "#1F28CF" in svg_content,
        "secondaryColor": any(
            color in svg_content for color in ["#FF9B21", "#89C5CC", "#8991DC"]
        ),
        "shoeColor": "#E4E4E4" in svg_content,
    }
    return {k: v for k, v in used_colors.items() if v}


def convert_file(js_file: Path, ts_file: Path, component_type: str):
    with open(js_file, "r") as f:
        content = f.read()

    svg_content = extract_svg_content(content)
    if not svg_content:
        print(f"Could not extract SVG content from {js_file}")
        return False

    # Get the colors actually used in this component
    # used_colors = get_used_colors(svg_content)
    used_colors = {}
    props = []
    defaults = []
    validations = []
    shading = []

    for var, colors in color_map.get(component_type, {}).items():
        if color := next((color for color in colors if color in svg_content), None):
            used_colors[var] = color
            svg_content = svg_content.replace(
                f'"{color}"', "{valid" + var[0].upper() + var[1:] + "}"
            )
            if not "Shaded" in var:
                props.append(f'{var} = "{color}"')
                validations.append(
                    f"  const valid{var[0].upper() + var[1:]} = ensureHexColor({var});"
                )
            else:
                shading.append(
                    f"  const valid{var[0].upper() + var[1:]} = darken(0.06)(valid{(var[0].upper() + var[1:]).replace('Shaded','')});"
                )

    # Build the interface based on used colors
    interface_props = []
    for var, color in used_colors.items():
        interface_props.append(f"  {var}?: string;")

    # Build the props destructuring and validation
    darken_import = ""
    if "ColorShaded" in svg_content:
        darken_import = f"import {{ darken }} from 'polished';"

    # Create TypeScript component with proper type hierarchy and color validation
    ts_content = f"""import React from "react";
import {{ HumaaanBodyPartProps }} from "../types";
import {{ ensureHexColor }} from "../util";
{darken_import}

const {js_file.stem.replace("Svg", "")}: React.FC<HumaaanBodyPartProps> = ({{ {", ".join(props)} }}) => {{
{chr(10).join(validations) if validations else ""}
{chr(10).join(shading) if shading else ""}

  return (
    {svg_content}
  );
}};

export default {js_file.stem.replace("Svg", "")};
"""

    # Write the TypeScript file
    with open(ts_file, "w") as f:
        f.write(ts_content)

    return True


def copy_component_files(src_base: Path, dest_base: Path, component_type: str):
    """Copy component files from source to destination directory"""
    src_dir = src_base / component_type
    dest_dir = dest_base / component_type

    # Create destination directory if it doesn't exist
    dest_dir.mkdir(parents=True, exist_ok=True)

    # Copy all JS files
    for js_file in src_dir.glob("*.js"):
        dest_file = dest_dir / js_file.name
        print(f"Copying {js_file.name} to {dest_file}...")
        shutil.copy2(js_file, dest_file)


def main():
    # Source and destination base directories
    src_base = Path("temp-humaaans/src/human/body-parts")
    dest_base = Path("src/components/characters/body-parts")

    # Component types to convert
    component_types = ["torso", "standing", "sitting", "head"]

    # First, copy all component files from temp-humaaans
    print("Copying component files...")
    for component_type in component_types:
        copy_component_files(src_base, dest_base, component_type)

    print("\nConverting components to TypeScript...")
    # Then convert the copied files to TypeScript
    for component_type in component_types:
        dest_dir = dest_base / component_type

        # Convert all JS files to TypeScript
        for js_file in dest_dir.glob("*.js"):
            ts_file = dest_dir / f"{js_file.stem.replace('Svg', '')}.tsx"
            print(f"Converting {js_file.name} to {ts_file.name}...")
            if convert_file(js_file, ts_file, component_type):
                print(f"Successfully converted {js_file.name}")
                # Only remove the JS file if conversion was successful
                js_file.unlink()
            else:
                print(f"Failed to convert {js_file.name}")


if __name__ == "__main__":
    main()
