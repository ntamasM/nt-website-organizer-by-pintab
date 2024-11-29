# NT Website Organizer by PinTab

**NT Website Organizer by PinTab** is a Chrome extension designed to help you manage, categorize, and organize your favorite websites efficiently. It enables you to save websites, group them into categories, and open them in pinned tabs for streamlined browsing. This extension is built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**.

---

## Features

### Website Management

- Save websites with custom titles.
- Drag and drop websites to rearrange their order.

### Categorization

- Create new categories or select from existing ones.
- Clickable category titles for quick access.
- Drag and drop categories to reorder them.

### Browsing Features

- Open all websites in a category with one click.
- Websites open in pinned tabs for a cleaner browsing experience.

### Enhanced User Interface

- Tailwind CSS for a modern and responsive design.
- Intuitive layout with easy navigation.

### Code Organization

- Modular folder structure for maintainable code.
- Built using React and Vite for optimized performance.

---

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/ntamasM/nt-website-organizer-by-pintab.git
cd nt-website-organizer-by-pintab
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Build the Extension

```bash
npm run build
```

### Step 4: Load the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer Mode** in the top-right corner.
3. Click **Load Unpacked** and select the `dist` folder from the project directory.

---

## Usage

### Adding Websites

- Save websites with custom titles.
- Organize websites into categories for better management.
- Drag and drop to reorder websites.

### Managing Categories

- Create new categories or choose from existing ones.
- Click category titles to view or open all websites in that category.

### Opening Websites

- Open individual websites or all websites in a category in pinned tabs.

---

## Development

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Steps for Local Development

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and load the extension manually as described in the **Installation** section.

---

## Folder Structure

```
nt-website-organizer-by-pintab/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable React components
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Application pages
│   ├── styles/           # Tailwind CSS configurations
│   └── main.tsx          # Entry point
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.ts        # Vite configuration
├── package.json          # npm package dependencies
├── README.md             # Project documentation
└── tsconfig.json         # TypeScript configuration
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your forked repository.
4. Submit a pull request with a detailed description of your changes.

---

## License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---

## Acknowledgments

Special thanks to the open-source community for providing tools like **React**, **Vite**, and **Tailwind CSS**, which made this project possible.
