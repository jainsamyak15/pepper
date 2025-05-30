# Pepper: Fan Token-Powered P2P Sports Prediction Market

## Overview

Pepper is a decentralized, peer-to-peer prediction market platform designed specifically for sports events, leveraging team-specific Fan Tokens on the Chiliz blockchain. It enables official team managers to create markets for their matches, allowing fans to participate using the team's Fan Tokens. This creates an engaging, team-centric betting experience while providing additional utility for Fan Tokens.

## Key Features

1. Team-specific markets using Fan Tokens
2. Peer-to-peer order matching system
3. Back and lay betting options
4. Risk-free protocol operation
5. Automated fee collection for platform sustainability

## Roles and Responsibilities

### Admin
- Deploy the Pepper contract
- Manage contract configuration (e.g., platform fees, minimum bet amounts)
- Add official team addresses with TEAM_ROLE

### Team Manager (TEAM_ROLE)
- Create official prediction markets for their events
- Update team information (name, Fan Token address, active status)
- Resolve markets by proposing the final outcome

### Users (Fans)
- Place back or lay orders on market outcomes using team-specific Fan Tokens
- Cancel their own unmatched orders
- Redeem winnings after market resolution

## Fan Token Integration

Fan Tokens are at the core of Pepper's functionality:

1. Team Registration: Each team is associated with its specific Fan Token.
2. Market Creation: Team managers create markets using their team's Fan Token.
3. Betting: Users place bets using the specified Fan Token for each market.
4. Winnings: Profits are paid out in Fan Tokens.
5. Future Feature: Governance voting for dispute resolution using Fan Tokens.

## User Flow

1. Connect Wallet: Users connect their wallet containing Fan Tokens to the Pepper dApp.
2. Browse Markets: View available prediction markets created by official team managers.
3. Place Order: Choose an outcome, specify amount and odds, and place a back or lay order using the required Fan Tokens.
4. Order Matching: Orders are matched peer-to-peer based on compatible odds and amounts.
5. Monitor: Track the progress of the event and the market.
6. Redeem Winnings: If successful, claim winnings after market resolution, minus the platform fee.

## Team Manager Flow

1. Team Registration: Admin adds the team manager address with TEAM_ROLE.
2. Update Team Info: Team manager can update team name, Fan Token address, and active status.
3. Create Market:
   - Set event details: category, question, description, options
   - Define start and end times
4. Monitor Market: Observe user participation.
5. Resolve Market: After the event concludes, propose the final outcome.

## Technical Implementation

### Key Functions

- addTeam: Add a new team with TEAM_ROLE (admin only)
- updateTeam: Update team information (team manager only)
- createMarket: Create a new prediction market (TEAM_ROLE only)
- placeOrder: Place a back or lay order on a specific outcome
- cancelOrder: Cancel an existing unmatched order
- _tryMatchOrder: Internal function to match compatible orders
- resolveMarket: Propose the final outcome of a market (TEAM_ROLE only)
- redeemWinnings: Claim winnings for successful bets

## Technical Architecture

![Pepper Technical Architecture Diagram](./docs/architecture-diagram.png)

*Technical architecture overview of the Pepper platform*

### Frontend Architecture

The Pepper frontend is built with a modern tech stack designed for optimal performance, user experience, and maintainability:

1. **Framework**: Next.js 14 (React-based framework)
   - Server-side rendering and static site generation capabilities
   - App Router with file-based routing
   - API routes for backend functionality

2. **UI Components**:
   - Custom UI components built with Radix UI primitives
   - Framer Motion for smooth animations and transitions
   - Tailwind CSS for utility-first styling
   - Icons from Heroicons, React-Icons, and Radix UI Icons

3. **State Management**:
   - React hooks for local component state
   - Context API for global state where needed
   - Custom hooks for reusable state logic

4. **Web3 Integration**:
   - Ethers.js (v5) for blockchain interactions
   - Web3 wallet integration (MetaMask compatibility)
   - Custom hooks for contract interactions

5. **Data Visualization**:
   - Chart.js and React-ChartJS-2 for market data visualization
   - Dynamic and responsive charts for market activity

6. **Frontend Directory Structure**:
   - `/src/app`: Next.js App Router pages and layouts
     - `/admin`: Admin dashboard and controls
     - `/teams/[teamId]`: Team-specific pages
     - `/markets`: Market browsing and interaction
     - `/create-market`: Market creation interface
     - `/profile`: User profile and history
   - `/src/components`: Reusable UI components
   - `/src/hooks`: Custom React hooks
   - `/src/lib`: Utility libraries
   - `/src/utils`: Helper functions

### Backend/Smart Contract Architecture

1. **Smart Contracts**:
   - `Pepper.sol`: Main contract handling markets, orders, and betting logic
   - `FanToken.sol`: ERC20 token contract for team fan tokens
   - Built with Solidity 0.8+
   - OpenZeppelin library for access control and token standards

2. **Contract Features**:
   - Role-based access control for different user types
   - P2P order matching system
   - Team and market management
   - Bet placement and settlement

3. **Development Environment**:
   - Hardhat for contract development, testing, and deployment
   - Waffle and Chai for contract testing
   - TypeScript for type safety

4. **Contract Security**:
   - OpenZeppelin contracts for standard implementations
   - Role-based permissions
   - Non-custodial design (protocol never holds user funds at risk)

### Deployment Architecture

1. **Frontend**:
   - Vercel for Next.js deployment
   - Continuous deployment from GitHub repository
   - Automatic preview deployments for PR review

2. **Smart Contracts**:
   - Deployed to Chiliz Chain
   - Contract verification on block explorer
   - Multi-sig for contract ownership and administration

3. **CI/CD Pipeline**:
   - Automated testing before deployment
   - Linting and type checking

### Integration Points

1. **Wallet Connection**:
   - Support for Chiliz Chain compatible wallets
   - Web3Modal for wallet selection

2. **Contract Interaction**:
   - Direct calls to smart contract functions
   - Event listening for real-time updates
   - Transaction status tracking

3. **Fan Token Integration**:
   - ERC20 token approval and transfers
   - Token balance tracking
   - Transaction fee estimation

### Security Measures

1. **Frontend Security**:
   - Input validation and sanitization
   - Protection against common web vulnerabilities
   - Secure storage of sensitive information

2. **Smart Contract Security**:
   - Access control restrictions
   - Checks-Effects-Interactions pattern
   - Event emission for transparency

3. **User Security**:
   - Connection to trusted nodes
   - Transaction confirmation steps
   - Clear warning messages for irreversible actions

## Fund Flow

1. Order Placement: When a user places an order, the required Fan Tokens are transferred to the contract.
2. Order Matching: Upon successful matching, the contract holds the Fan Tokens from both parties.
3. Market Resolution: After the market is resolved by the team manager, winners can claim their winnings.
4. Platform Fee: A configurable percentage of each winning bet is deducted as a platform fee before payout.
5. Refunds: Unmatched orders are automatically refunded when the market is resolved.

## Platform Profitability

Pepper ensures sustainable operations through an automated fee collection mechanism:

- A small, configurable percentage fee is deducted from winning bets.
- Fees are collected at the time of winning redemption, ensuring the protocol never holds liability.
- Collected fees are sent to a designated treasury address for platform maintenance and development.

## Security Considerations

- Role-based access control (RBAC) for admin and team manager functions
- Time-based checks to prevent actions on expired or invalid markets
- Careful handling of Fan Token transfers and storage
- No protocol liability, as all bets are peer-to-peer and fees are collected from winnings

## Future Enhancements

- Implementation of a governance voting system for dispute resolution using Fan Tokens
- Integration with Chiliz blockchain for real-time sports data feeds
- Enhanced analytics and reporting for users and team managers
- Multi-language support for global accessibility

## Conclusion

Pepper revolutionizes sports betting by creating a direct connection between teams and their fans through Fan Tokens. By providing a peer-to-peer prediction market platform, it significantly enhances the utility of Fan Tokens and offers an immersive, engaging experience for sports enthusiasts. The platform's design ensures fair, transparent, and sustainable operations, benefiting teams, fans, and the broader sports ecosystem.