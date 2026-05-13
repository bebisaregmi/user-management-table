# React Table Users Dashboard

A modern React application featuring a sortable, searchable user management table built with React Table v8, React Query, and Tailwind CSS.

## 🚀 Features

- **Advanced Table Functionality**: Built with `@tanstack/react-table` for powerful table features
- **Selective Sorting**: Sort by Name and Email columns only with three-state sorting (ascending → descending → none)
- **Real-time Search**: Search users by name, email, or company name with instant filtering
- **Smart Pagination**: Custom pagination with configurable page sizes
- **Loading States**: Elegant loading spinners and error handling
- **Responsive Design**: Mobile-friendly table with horizontal scrolling
- **Data Fetching**: Efficient API calls with React Query caching

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **@tanstack/react-query** - Server state management and caching
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library (Font Awesome icons)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bebisaregmi/user-management-table.git
   cd react-table-users-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Required packages** (if not already installed)
   ```bash
   npm install @tanstack/react-query @tanstack/react-table axios react-icons react-router-dom
   ```
 "@tailwindcss/vite": "^4.1.11",
    
## 🏃‍♂️ Running the Project

```bash
npm start
# or
yarn start
```

The application will open at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   └── Pagination.jsx     # Custom pagination component
├── pages/
│   └── Users.jsx     # User table page
├── assets/
│   └── data-not-found.png # No data illustration
└── App.jsx
```
