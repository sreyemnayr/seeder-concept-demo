#!/bin/bash

# Create the target directory if it doesn't exist
mkdir -p src/components/characters/body-parts/head

# Function to convert a JS file to TypeScript
convert_file() {
  local input_file=$1
  local output_file=$2
  local component_name=$(basename "$input_file" .js)
  
  # Create TypeScript component with proper SVG handling
  cat > "$output_file" << EOL
import React from "react";

interface HeadProps {
  skinColor?: string;
  hairColor?: string;
}

const ${component_name}: React.FC<HeadProps> = ({ skinColor = "#B28B67", hairColor = "#191847" }) => (
$(cat "$input_file" | sed -n '/<g/,/<\/g>/p' | sed 's/#B28B67/${skinColor}/g' | sed 's/#191847/${hairColor}/g')
);

export default ${component_name};
EOL
}

# Convert all head components
for file in temp-humaaans/src/human/body-parts/head/*.js; do
  filename=$(basename "$file")
  component_name="${filename%.*}"
  output_file="src/components/characters/body-parts/head/${component_name}.tsx"
  convert_file "$file" "$output_file"
done

# Make the script executable
chmod +x convert-heads.sh 