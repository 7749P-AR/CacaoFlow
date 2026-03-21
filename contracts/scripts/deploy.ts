import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

const EXPLORERS: Record<number, string> = {
  421614: "https://sepolia.arbiscan.io/address/",
  42161:  "https://arbiscan.io/address/",
  43113:  "https://testnet.snowtrace.io/address/",
  43114:  "https://snowtrace.io/address/",
  31337:  "http://localhost:8545/",
};

const NETWORK_NAMES: Record<number, string> = {
  421614: "arbitrum-sepolia",
  42161:  "arbitrum-one",
  43113:  "avalanche-fuji",
  43114:  "avalanche",
  31337:  "localhost",
};

async function main() {
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);
  const networkName = NETWORK_NAMES[chainId] || `chain-${chainId}`;

  console.log("Deploying contracts with:", deployer.address);
  console.log("Network:", networkName, `(chainId: ${chainId})`);
  console.log("Balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)));

  // 1. Deploy MockUSDC
  console.log("\n1. Deploying MockUSDC...");
  const MockUSDC = await ethers.getContractFactory("MockUSDC");
  const mockUSDC = await MockUSDC.deploy();
  await mockUSDC.waitForDeployment();
  const usdcAddress = await mockUSDC.getAddress();
  console.log("MockUSDC deployed to:", usdcAddress);

  // 2. Deploy CacaoFlowOpportunities
  console.log("\n2. Deploying CacaoFlowOpportunities...");
  const CacaoFlow = await ethers.getContractFactory("CacaoFlowOpportunities");
  const cacaoFlow = await CacaoFlow.deploy(usdcAddress, deployer.address);
  await cacaoFlow.waitForDeployment();
  const cacaoFlowAddress = await cacaoFlow.getAddress();
  console.log("CacaoFlowOpportunities deployed to:", cacaoFlowAddress);

  // 3. Save addresses to frontend (update only this chainId)
  const outputDir = path.join(__dirname, "../../src/lib/contracts");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const addressesFile = path.join(outputDir, "addresses.json");
  const existing = fs.existsSync(addressesFile)
    ? JSON.parse(fs.readFileSync(addressesFile, "utf8"))
    : {};

  existing[String(chainId)] = {
    network: networkName,
    MockUSDC: usdcAddress,
    CacaoFlowOpportunities: cacaoFlowAddress,
    deployedAt: new Date().toISOString(),
    deployer: deployer.address,
  };

  fs.writeFileSync(addressesFile, JSON.stringify(existing, null, 2));
  console.log(`\nAddresses saved for chainId ${chainId} in src/lib/contracts/addresses.json`);

  // 4. Export ABIs
  const usdcArtifact = await ethers.getContractFactory("MockUSDC");
  const cacaoArtifact = await ethers.getContractFactory("CacaoFlowOpportunities");

  fs.writeFileSync(
    path.join(outputDir, "MockUSDC.abi.json"),
    JSON.stringify(usdcArtifact.interface.fragments, null, 2)
  );
  fs.writeFileSync(
    path.join(outputDir, "CacaoFlowOpportunities.abi.json"),
    JSON.stringify(cacaoArtifact.interface.fragments, null, 2)
  );
  console.log("ABIs saved to src/lib/contracts/");

  console.log("\n✅ Deployment complete!");
  console.log("─────────────────────────────────────────");
  console.log("MockUSDC:               ", usdcAddress);
  console.log("CacaoFlowOpportunities: ", cacaoFlowAddress);
  console.log("─────────────────────────────────────────");
  const explorer = EXPLORERS[chainId] || "";
  if (explorer) console.log("Explorer: " + explorer + cacaoFlowAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
