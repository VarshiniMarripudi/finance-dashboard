# Finance Dashboard UI

An interactive, responsive, and beautifully designed Finance Dashboard built with React to evaluate modern frontend capabilities. The application aims to solve the problem of visual clutter by providing a highly structured, scalable layout mapping personal finance activities natively in the browser.

## Overview of Approach

The project was structured focusing heavily on **simplicity**, **technical modularity**, and **custom aesthetic design**.
Instead of relying on boilerplate styling frameworks like TailwindCSS or MUI, the choice was made to construct a premium UI completely from scratch using standard CSS modules. This highlights strong proficiency in core frontend layout strategies (Flexbox, CSS Gradients, Grid setups) and micro-interactions.

- **Routing / Structure**: Purely component-driven.
- **State Management**: Built on top of React Context (`FinanceContext.jsx`), managing a global pool of mock transactions and providing derived values using `useMemo` for optimal computational performance avoiding unnecessary re-renders.
- **Data Visualization**: Leveraged `recharts` for scalable SVG based graphs allowing clean trend visualization over time and categorical allocations.

## Features

1. **Dashboard Overview**
   - High-level financial summary cards displaying dynamically computed Total Balance, Total Income, and Total Expenses.
   - Smooth Area Chart tracking the trajectory of cumulative balance across the timeline.

2. **Transactions Section**
   - Implements simple and clean tabular lists.
   - Includes full-text search capability.
   - Filter transactions based on category type (All, Income, Expense).
   - Simulates **Role Based Access Control (RBAC)**.
     - **Admin**: Has explicit action buttons allowing them to "Add Mock Transactions" on the fly and delete specific transactions.
     - **Viewer**: Read-only interface cleanly hiding action layouts.

3. **Intelligent Insights**
   - Includes a Pie Chart visualization breaking down precisely where expenses are allocated.
   - Intelligent AI Observations: Computes the highest spending category automatically and dynamically interprets overall financial health (whether you are profiting or carrying a deficit in the current data).

4. **Premium UI/UX Polish**
   - Hover states for all table rows and buttons.
   - Built to handle empty states elegantly (e.g., hiding charts dynamically if no data matches the filters or all data is deleted).

## Setup Instructions

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone or Navigate to the directory:**
   Ensure you are in the project folder:
   ```bash
   cd finance-dashboard
   ```

2. **Install Dependencies:**
   Install required packages (Vite, React, Recharts, Lucide-React):
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   Deploy the application locally with hot-reloading:
   ```bash
   npm run dev
   ```

4. **View the Dashboard:**
   Open the browser link displayed in your terminal (typically `http://localhost:5173/`).


