echo "Installing Node.js LTS and npm packages..."

. ${NVM_DIR}/nvm.sh && nvm install --lts

pushd src/WebClient
npm install
popd
echo "Installation of Node.js LTS and npm packages complete."

echo "Restoring .NET dependencies..."
dotnet restore
echo "Restoration of .NET dependencies complete."
