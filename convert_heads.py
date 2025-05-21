import os
import re
from pathlib import Path

# Color mapping for accessories
ACCESSORY_COLORS = {
    "#FF9B21": "orangeColor",
    "#5C63AB": "turbanColor",
    "#89C5CC": "accessoryColor1",
    "#8991DC": "accessoryColor2",
}


def get_colors_used(content: str) -> set:
    """Extract all colors used in the component."""
    colors = set()
    # Match colors in fill attribute
    fill_colors = re.findall(r'fill="#([A-F0-9]{6})"', content)
    # Match colors in style attribute
    style_colors = re.findall(r"fill: #([A-F0-9]{6})", content)
    colors.update(fill_colors)
    colors.update(style_colors)
    return {f"#{c}" for c in colors}


def create_props_defaults(colors_used: set) -> str:
    """Create the props defaults based on colors used."""
    defaults = []
    if "#B28B67" in colors_used:
        defaults.append('skinColor = "#B28B67"')
    if "#191847" in colors_used:
        defaults.append('hairColor = "#191847"')

    # Add accessory color defaults
    for color, prop_name in ACCESSORY_COLORS.items():
        if color in colors_used:
            defaults.append(f'{prop_name} = "{color}"')

    return ", ".join(defaults)


def create_ts_content(name: str, svg_content: str, colors_used: set) -> str:
    props_defaults = create_props_defaults(colors_used)

    return f"""import React from "react";
import {{ HeadProps }} from "@/types/head";

const {name}: React.FC<HeadProps> = ({{ {props_defaults} }}) => (
{svg_content}
);

export default {name};"""


def convert_file(input_path: Path, output_path: Path):
    # Read the input file
    content = input_path.read_text()

    # Extract the component name
    name = input_path.stem
    if name.startswith("Svg"):
        name = name[3:]

    # Extract the SVG content
    svg_match = re.search(r"<g.*?</g>\s*\)", content, re.DOTALL)
    if not svg_match:
        print(f"Could not find SVG content in {input_path}")
        return

    svg_content = svg_match.group()

    # Remove the closing parenthesis that was captured
    svg_content = svg_content.rstrip(")")

    # Get all colors used in the component
    colors_used = get_colors_used(content)

    # Replace hardcoded colors with props
    if "#B28B67" in colors_used:
        svg_content = re.sub(r'fill="#B28B67"', r"fill={skinColor}", svg_content)
        svg_content = re.sub(r"fill: #B28B67", r"fill: {skinColor}", svg_content)

    if "#191847" in colors_used:
        svg_content = re.sub(r'fill="#191847"', r"fill={hairColor}", svg_content)
        svg_content = re.sub(r"fill: #191847", r"fill: {hairColor}", svg_content)

    # Replace accessory colors with props
    for color, prop_name in ACCESSORY_COLORS.items():
        if color in colors_used:
            svg_content = re.sub(
                f'fill="{color}"', f"fill={{{prop_name}}}", svg_content
            )
            svg_content = re.sub(
                f"fill: {color}", f"fill: {{{prop_name}}}", svg_content
            )

    # Add proper indentation
    svg_content = "  " + svg_content.replace("\n", "\n  ")

    # Create the TypeScript component
    ts_content = create_ts_content(name, svg_content, colors_used)

    # Write the output file
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(ts_content)
    print(f"Converted {input_path.name} -> {output_path.name}")


def main():
    # Source and destination directories
    src_dir = Path("temp-humaaans/src/human/body-parts/head")
    dst_dir = Path("src/components/characters/body-parts/head")

    # Create destination directory if it doesn't exist
    dst_dir.mkdir(parents=True, exist_ok=True)

    # Convert all JS files to TypeScript
    for js_file in src_dir.glob("*.js"):
        ts_file = dst_dir / f"{js_file.stem}.tsx"
        convert_file(js_file, ts_file)


if __name__ == "__main__":
    main()
