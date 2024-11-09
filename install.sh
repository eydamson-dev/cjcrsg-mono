#!/bin/bash

# Define the target directory for symbolic links
TARGET_DIR="$HOME/.config/cjcrsg"
PROJECT_ROOT="$(pwd)"  # Use the current directory as the project root

# Prompt the user to specify their shell (bash or zsh)
read -p "Are you using bash or zsh? [bash/zsh]: " SHELL_TYPE

# Set the shell config file based on user input
if [[ "$SHELL_TYPE" == "zsh" ]]; then
    SHELL_CONFIG="$HOME/.zshrc"
elif [[ "$SHELL_TYPE" == "bash" ]]; then
    SHELL_CONFIG="$HOME/.bashrc"
else
    echo "Invalid choice. Defaulting to bash."
    SHELL_CONFIG="$HOME/.bashrc"
fi

# Create the target directory if it doesn't exist
mkdir -p "$TARGET_DIR"

# Define the script to install and its command names
SCRIPT="docker-control.sh"
COMMAND_NAME="cjcrsg"
ALIAS_NAME="cjc"
MONO_ALIAS_NAME="cjcrsg-mono"

# Export the project root directory to the environment variable CJCRSG_ROOT in the shell config file
if ! grep -q "export CJCRSG_ROOT=" "$SHELL_CONFIG"; then
    echo "export CJCRSG_ROOT=\"$PROJECT_ROOT\"" >> "$SHELL_CONFIG"
    echo "Set CJCRSG_ROOT environment variable to $PROJECT_ROOT in $SHELL_CONFIG"
else
    sed -i "s|^export CJCRSG_ROOT=.*|export CJCRSG_ROOT=\"$PROJECT_ROOT\"|" "$SHELL_CONFIG"
    echo "Updated CJCRSG_ROOT environment variable to $PROJECT_ROOT in $SHELL_CONFIG"
fi
source "$SHELL_CONFIG"

# Create symbolic link for cjcrsg command
if [[ -f "$SCRIPT" ]]; then
    # Link the script to the target directory
    ln -sf "$PROJECT_ROOT/$SCRIPT" "$TARGET_DIR/$COMMAND_NAME"
    echo "Installed $SCRIPT as $COMMAND_NAME in $TARGET_DIR"
    
    # Create alias link for "cjc"
    ln -sf "$TARGET_DIR/$COMMAND_NAME" "$TARGET_DIR/$ALIAS_NAME"
    echo "Installed alias $ALIAS_NAME for $COMMAND_NAME in $TARGET_DIR"

    # Create an alias script to cd into the dynamically detected project folder
    echo -e "#!/bin/bash\ncd \"$PROJECT_ROOT\"" > "$TARGET_DIR/$MONO_ALIAS_NAME"
    chmod +x "$TARGET_DIR/$MONO_ALIAS_NAME"
    echo "Installed alias $MONO_ALIAS_NAME to change directory to project root"
else
    echo "Warning: $SCRIPT not found. Skipping."
fi

# Update PATH if necessary
if [[ ":$PATH:" != *":$TARGET_DIR:"* ]]; then
    echo "export PATH=\"\$PATH:$TARGET_DIR\"" >> "$SHELL_CONFIG"
    source "$SHELL_CONFIG"
    echo "$TARGET_DIR added to PATH."
else
    echo "$TARGET_DIR is already in PATH."
fi

echo "Installation complete. You can now run $COMMAND_NAME, $ALIAS_NAME, or $MONO_ALIAS_NAME from anywhere."

