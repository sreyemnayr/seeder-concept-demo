from pathlib import Path
import re
import shutil


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


def get_used_colors(svg_content):
    """Determine which colors are actually used in the SVG content"""
    used_colors = {
        "skinColor": "#B28B67" in svg_content,
        "shadedSkinColor": "#997659" in svg_content,
        "hairColor": "#191847" in svg_content,
        "clothingColor": any(
            color in svg_content
            for color in ["#7331FF", "#5C63AB", "#2F3676", "#2B44FF"]
        ),
        "shadedClothingColor": "#1F28CF" in svg_content,
        "accessoryColor": any(
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
    used_colors = get_used_colors(svg_content)

    # Replace color codes with prop interpolation (no quotes)
    if "skinColor" in used_colors:
        svg_content = svg_content.replace('"#B28B67"', "{validSkinColor}")
    if "shadedSkinColor" in used_colors:
        svg_content = svg_content.replace('"#997659"', "{shadedSkinColor}")
    if "hairColor" in used_colors:
        svg_content = svg_content.replace('"#191847"', "{validHairColor}")
    if "clothingColor" in used_colors:
        svg_content = svg_content.replace('"#7331FF"', "{validClothingColor}")
        svg_content = svg_content.replace('"#5C63AB"', "{validClothingColor}")
        svg_content = svg_content.replace('"#2F3676"', "{validClothingColor}")
        svg_content = svg_content.replace('"#2B44FF"', "{validClothingColor}")
    if "shadedClothingColor" in used_colors:
        svg_content = svg_content.replace('"#1F28CF"', "{shadedClothingColor}")
    if "accessoryColor" in used_colors:
        svg_content = svg_content.replace('"#FF9B21"', "{validAccessoryColor}")
        svg_content = svg_content.replace('"#89C5CC"', "{validAccessoryColor}")
        svg_content = svg_content.replace('"#8991DC"', "{validAccessoryColor}")
    if "shoeColor" in used_colors:
        svg_content = svg_content.replace('"#E4E4E4"', "{validShoeColor}")

    # Build the interface based on used colors
    interface_props = []
    if any(color in used_colors for color in ["skinColor", "shadedSkinColor"]):
        interface_props.append("  skinColor?: string;")
    if "hairColor" in used_colors:
        interface_props.append("  hairColor?: string;")
    if "accessoryColor" in used_colors:
        interface_props.append("  accessoryColor?: string;")
    if "shoeColor" in used_colors:
        interface_props.append("  shoeColor?: string;")

    # Build the props interface
    base_interface = ""
    if interface_props:
        base_interface = f"""interface BaseBodyPartProps {{
{chr(10).join(interface_props)}
}}

"""

    bottom_interface = ""
    if any(color in used_colors for color in ["clothingColor", "shadedClothingColor"]):
        if interface_props:
            bottom_interface = """interface BottomProps extends BaseBodyPartProps {
  clothingColor?: string;
}

"""
        else:
            bottom_interface = """interface BottomProps {
  clothingColor?: string;
}

"""

    # Build the props destructuring and validation
    props = []
    defaults = []
    validations = []
    shading = []

    if any(color in used_colors for color in ["clothingColor", "shadedClothingColor"]):
        props.append('clothingColor = "#7331FF"')
        validations.append(
            "  const validClothingColor = ensureHexColor(clothingColor);"
        )
        if "shadedClothingColor" in used_colors:
            shading.append(
                "  const shadedClothingColor = darken(0.06)(validClothingColor);"
            )
    if any(color in used_colors for color in ["skinColor", "shadedSkinColor"]):
        props.append('skinColor = "#B28B67"')
        validations.append("  const validSkinColor = ensureHexColor(skinColor);")
        if "shadedSkinColor" in used_colors:
            shading.append("  const shadedSkinColor = darken(0.06)(validSkinColor);")
    if "hairColor" in used_colors:
        props.append('hairColor = "#191847"')
        validations.append("  const validHairColor = ensureHexColor(hairColor);")
    if "accessoryColor" in used_colors:
        props.append('accessoryColor = "#FF9B21"')
        validations.append(
            "  const validAccessoryColor = ensureHexColor(accessoryColor);"
        )
    if "shoeColor" in used_colors:
        props.append('shoeColor = "#E4E4E4"')
        validations.append("  const validShoeColor = ensureHexColor(shoeColor);")

    # Create TypeScript component with proper type hierarchy and color validation
    ts_content = f"""import React from "react";
import {{ darken }} from "polished";

const ensureHexColor = (color: string) => {{
  // If color is already a valid hex color, return it
  if (/^#[0-9A-Fa-f]{{6}}$/.test(color)) {{
    return color;
  }}
  // Otherwise, return a default color
  console.warn(`Invalid color format: ${{color}}. Using default color.`);
  return "#000000";
}};

{base_interface}{bottom_interface}const {js_file.stem.replace("Svg", "")}: React.FC<{bottom_interface and "BottomProps" or "BaseBodyPartProps"}> = ({{ {", ".join(props)} }}) => {{
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
    component_types = ["torso", "standing", "sitting"]

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
