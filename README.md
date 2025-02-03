# **Reddit Clone App**  

Welcome to the **Reddit Clone App**! This is a fully functional, responsive Reddit client that allows users to browse posts, search for content, and view post details with images and videos. The app is built using **React, Redux, Tailwind CSS, and the Reddit API** for real-time data.  

## **Features**  

✅ **Browse Reddit posts** – View posts from multiple subreddits with images, videos, and metadata (upvotes, comments).  
✅ **Search functionality** – Enter search terms to find relevant Reddit posts dynamically.  
✅ **Post details page** – Click on a post to view its full content, media, and comments.  
✅ **Load More functionality** – Seamlessly load additional posts without losing your scroll position.  
✅ **Responsive design** – Optimized for **desktop and mobile** using **Tailwind CSS**.  
✅ **Image carousel for multi-image posts** – Swipe through multiple images using Swiper.js.  
✅ **Video support** – Watch embedded Reddit-hosted videos directly in the app.  
✅ **Upvote & comment counters** – Displays key engagement metrics on each post.  

---

## **Tech Stack**  

🚀 **Frontend:**  
- **React** – UI framework for building dynamic components  
- **Redux Toolkit** – State management for handling posts and search queries  
- **React Router** – Client-side routing for seamless navigation  
- **Tailwind CSS** – Utility-first styling for a modern, responsive design  
- **Framer Motion** – Adds smooth animations and transitions  
- **Swiper.js** – Enables image carousels for multi-image posts  

🔗 **API & Data:**  
- **Reddit API** – Fetches real-time Reddit posts and comments using OAuth authentication  
- **Axios** – Handles API requests efficiently  

🛠 **Development Tools:**  
- **Vite** – Fast development environment for React  
- **ESLint & Prettier** – Code quality and formatting  
- **Jest & Enzyme** – Unit and end-to-end testing (in progress)  

---

## **Wireframes & Design**  

The following wireframes guided the app's design and layout:  

📌 **Homepage (Desktop & Mobile)**  
📌 **Search Results (Desktop & Mobile)**  
📌 **Post Details (Desktop & Mobile)**  

[View Wireframes Here](#src/assets/wireframes) 

---

## **Installation & Setup**  

To run the project locally, follow these steps:  

### **1️⃣ Clone the repository:**  
```
git clone https://github.com/funky-duckling/Portfolio-Project---Reddit.git
cd Portfolio-Project---Reddit
```

### **2️⃣ Install dependencies:**
```
npm install
```

### **3️⃣ Run the app:**
```
npm run dev
```

The app will now be available at http://localhost:5173.

---

## **Usage**  

### 💡 **Navigation:**  
- Use the **NavBar** to switch between **"Hot"**, **"New"**, and **"Top"** posts.  
- Click the **logo** or **title** to return to the homepage.  

### 🔍 **Searching:**  
- Enter a search term in the **search bar** to find Reddit posts dynamically.  
- Results update in real-time without reloading the page.  

### 🖼 **Viewing Posts:**  
- Click a post to **view its full details**, including text content, images, or videos.  
- Posts with **multiple images** allow you to **swipe through a carousel**.  
- Posts with **videos** display an embedded video player.  

### 💬 **Comments:**  
- The **Post Details** page includes a **comment section** displaying real-time comments.  
- If a post has no comments, a **"No comments available"** message is shown.  

### 📜 **Load More:**  
- At the bottom of the homepage, click **"Load More"** to fetch additional posts **without losing scroll position**.  

---

## **Roadmap & Future Improvements**  

🔹 **Write unit tests** using **Jest & Enzyme** (in progress).  
🔹 **Improve accessibility** for a better user experience.  
🔹 **Add user authentication** to allow personalized interactions (voting, commenting).  
🔹 **Enhance performance** and optimize API calls.  

---

## **Contributing**  

Contributions are welcome! Feel free to **fork** the repo, **submit issues**, or **open pull requests** to help improve the app.  

---

## **License**  

📜 This project is licensed under the **MIT License**.  

---

### 🎯 **Final Notes:**  
- This README reflects the current functionality of the **Reddit Clone App**.  
- If there are **specific features** you want to highlight or modify, let me know! 🚀  

