echo "Restoring .NET dependencies..."
dotnet restore
echo "Restoration of .NET dependencies complete."

echo "Installing npm dependencies..."
pushd src/WebClient
npm ci
popd
echo "Installation of npm dependencies complete."
