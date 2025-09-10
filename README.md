# 🍦 Chillz Ice Cream - Interactive Landing Page

A modern, animated React landing page for an ice cream brand featuring smooth flavor transitions, interactive thumbnails, and responsive design.

![Chillz Ice Cream Preview](./preview-screenshot.png)

## 🌟 Features

### ✨ **Interactive Ice Cream Experience**
- **Dynamic Flavor Switching**: Click thumbnails to switch between 4 ice cream flavors
- **Smooth Animations**: Elegant slide-in/slide-out transitions between flavors
- **Hover Effects**: Thumbnails lift and scale on hover for better user feedback
- **Color-Coded Themes**: Each flavor has its own background color scheme

### 🎨 **Visual Design**
- **Custom Typography**: Beautiful cursive font for the main title
- **Responsive Layout**: Optimized for all screen sizes (mobile, tablet, desktop)
- **Image Positioning**: Ice cream cones positioned to touch the bottom of the screen
- **Visual Hierarchy**: Clear typography scaling and spacing

### 🚀 **Technical Features**
- **React 19**: Latest React features with hooks
- **Vite**: Fast development and build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Custom Animations**: CSS keyframes for smooth transitions
- **Performance Optimized**: Efficient re-renders and state management

## 📁 Project Structure

```
Chillz-IceCream/
├── Chillz/                          # Main project directory
│   ├── public/                      # Static assets
│   │   └── vite.svg                # Vite logo
│   ├── src/                         # Source code
│   │   ├── assets/                  # Image assets
│   │   │   └── images/             # Ice cream images
│   │   │       ├── Blueberry-cone.png
│   │   │       ├── Chocolate-cone.png
│   │   │       ├── Evergreen-cone.png
│   │   │       └── Strawberry-cone.png
│   │   ├── components/             # React components
│   │   │   └── IceCreamLanding.jsx # Main landing page component
│   │   ├── App.jsx                 # Root App component
│   │   ├── App.css                 # App-specific styles
│   │   ├── main.jsx                # Entry point
│   │   └── index.css               # Global styles
│   ├── dist/                       # Build output (generated)
│   ├── node_modules/              # Dependencies (generated)
│   ├── package.json               # Project dependencies
│   ├── package-lock.json          # Dependency lock file
│   ├── vite.config.js             # Vite configuration
│   ├── tailwind.config.js         # Tailwind CSS configuration
│   ├── postcss.config.js          # PostCSS configuration
│   ├── eslint.config.js           # ESLint configuration
│   ├── index.html                 # HTML entry point
│   └── README.md                  # Project documentation
└── README.md                      # This file
```

## 🛠️ Tech Stack

- **Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Styling**: Tailwind CSS 4.1.13
- **Fonts**: Google Fonts (Poppins, Caveat, Kalam)
- **Linting**: ESLint 9.33.0
- **Language**: JavaScript (ES6+)

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Chillz-IceCream/Chillz
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

## 🌐 Deployment

### Building for Production

1. **Create production build**
   ```bash
   npm run build
   ```

2. **Preview build locally** (optional)
   ```bash
   npm run preview
   ```

3. **Deploy the `dist` folder** to your hosting platform:
   - **Vercel**: `vercel --prod`
   - **Netlify**: Drag & drop `dist` folder or connect via Git
   - **GitHub Pages**: Upload `dist` contents
   - **Firebase**: `firebase deploy`

### Environment Configuration

No environment variables required for basic setup. All configurations are handled through:
- `vite.config.js` - Build settings
- `tailwind.config.js` - Styling configuration
- `package.json` - Dependencies and scripts

## 🎯 Component Documentation

### IceCreamLanding.jsx - Main Component

#### **Key Features:**
- **State Management**: Handles active flavor, transitions, and animations
- **Animation System**: Custom CSS keyframes for smooth transitions
- **Responsive Design**: Tailwind classes for all screen sizes
- **Interactive Elements**: Hover effects and click handlers

#### **State Variables:**
```javascript
const [activeIndex, setActiveIndex] = useState(0);        // Current selected flavor
const [isTransitioning, setIsTransitioning] = useState(false); // Animation state
const [displayIndex, setDisplayIndex] = useState(0);      // Display tracking
```

#### **Animation Flow:**
1. User clicks thumbnail → `handleFlavorChange()`
2. Trigger slide-out animation → `setIsTransitioning(true)`
3. Wait 400ms for exit animation
4. Update flavor → `setActiveIndex()` 
5. Trigger slide-in animation → `setIsTransitioning(false)`

#### **Flavor Configuration:**
```javascript
const flavourCorrections = {
  "Strawberry cone": { toY: "-8px", toS: 1.02 },  // Vertical offset & scale
  "Blueberry cone": { toY: "-4px", toS: 1.02 },   // Image positioning
  "Chocolate cone": { toY: "0px", toS: 1.01 },    // Per-flavor adjustments
  "Evergreen cone": { toY: "4px", toS: 1.01 },    // Baseline reference
};
```

## 🐛 Known Issues & Limitations

### Current Limitations:
1. **Mobile Landscape**: Layout may need adjustment for landscape mobile views
2. **Image Loading**: No lazy loading implemented for ice cream images
3. **Accessibility**: Could benefit from ARIA labels for better screen reader support
4. **SEO**: Limited meta tags and Open Graph properties

### Browser Support:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ Internet Explorer: Not supported

### Performance Considerations:
- Images are loaded upfront (all 4 flavors)
- Animation performance depends on device capabilities
- CSS transforms used for 60fps animations

## 🔧 Customization Guide

### Adding New Flavors:

1. **Add image** to `src/assets/images/`
2. **Import image** in `IceCreamLanding.jsx`
3. **Update arrays**:
   ```javascript
   // Add to flavourCorrections
   "New Flavor": { toY: "0px", toS: 1.0 }
   
   // Add to iceCreams array
   {
     name: "New Flavor",
     bgColor: "#YOUR_COLOR",
     mainImage: newFlavorImage,
     thumbnail: newFlavorImage,
   }
   ```

### Modifying Animations:
- **Duration**: Change timing in CSS keyframes
- **Easing**: Modify `cubic-bezier()` values
- **Effects**: Update transform properties

### Styling Changes:
- **Colors**: Update `bgColor` in flavor objects
- **Fonts**: Modify Google Fonts imports
- **Spacing**: Adjust Tailwind classes

## 📱 Responsive Breakpoints

| Screen Size | Breakpoint | Optimizations |
|-------------|-----------|---------------|
| Mobile | `< 640px` | Smaller fonts, stacked layout |
| Tablet | `640px - 768px` | Medium fonts, grid layout |
| Desktop | `768px - 1024px` | Larger fonts, full grid |
| Large | `> 1024px` | Maximum fonts, wide layout |

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Fonts** for typography (Poppins, Caveat, Kalam)
- **Tailwind CSS** for utility-first styling
- **Vite** for fast development experience
- **React** for component architecture

---

### 📞 Contact & Support

For questions, suggestions, or support:
- Create an issue in the repository
- Check existing documentation
- Review the code comments for implementation details

**Made with ❤️ for ice cream lovers everywhere! 🍦**