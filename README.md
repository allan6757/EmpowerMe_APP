# 🌟 EmpowerMe - Social Challenge & Mood Booster App

Transform your daily routine into a journey of personal growth and achievement with friends!

## 🚀 Features

### 🎯 **Daily Challenges**
- 3 default challenges for every user
- Create custom challenges with categories (Wellness, Growth, Fun, Social)
- Edit and delete custom challenges
- Track completion with beautiful progress indicators

### 📅 **Calendar & Progress**
- Interactive calendar with daily progress dots
- Historical progress tracking
- Date-based challenge management
- Visual completion statistics

### 👥 **Social Features**
- Search users by name
- Send and receive friend requests
- Partner tracking system
- View partner's daily progress and streaks
- Real-time social updates

### 🏆 **Rewards System**
- Weekly prizes based on participation
- Point accumulation system
- Achievement badges
- Streak tracking and celebrations

### 🎭 **Personality Insights**
- Dynamic personality types based on completion patterns
- Time-based greetings (Good morning/afternoon/evening)
- Motivational quotes from API
- Beautiful background images

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Inline styles with glassmorphism effects
- **State Management**: React useState hooks
- **Data Storage**: localStorage for persistence
- **Date Handling**: date-fns library
- **Icons**: Custom SVG icons
- **API**: Quotable API for motivational quotes

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd empowerme-app

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🎮 Demo Accounts

Test the app with these pre-created accounts:

**Account 1:**
- Email: `sarah@demo.com`
- Password: `demo123`

**Account 2:**
- Email: `mike@demo.com`
- Password: `demo123`

## 🏗️ Project Structure

```
src/
├── App.jsx                 # Main application component
├── components/
│   ├── Auth/              # Login & Signup components
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── Social/            # Social features
│   │   ├── FriendsList.jsx
│   │   └── PartnerTracker.jsx
│   ├── Calendar/          # Calendar functionality
│   │   └── CalendarView.jsx
│   ├── Rewards/           # Prize system
│   │   └── WeeklyPrizes.jsx
│   ├── ChallengeList.jsx  # Challenge display
│   ├── ChallengeItem.jsx  # Individual challenge
│   ├── AddChallengeForm.jsx # Challenge creation
│   ├── ProgressBar.jsx    # Progress visualization
│   ├── PersonalityCard.jsx # User insights
│   ├── StreakCard.jsx     # Streak tracking
│   └── About.jsx          # App information
├── firebase.js            # Database configuration
└── App.css               # Custom styles
```

## 🎯 Key Learning Concepts

### React Fundamentals
- **Components**: Reusable UI building blocks
- **State Management**: Using useState for data
- **Props**: Passing data between components
- **Event Handling**: User interaction responses
- **Conditional Rendering**: Dynamic UI updates

### Data Management
- **localStorage**: Browser-based data persistence
- **User-specific Storage**: Isolated user data
- **CRUD Operations**: Create, Read, Update, Delete
- **Array Methods**: map(), filter(), find()

### Modern JavaScript
- **ES6+ Features**: Arrow functions, destructuring, spread operator
- **Async Operations**: API calls and data fetching
- **Date Manipulation**: Using date-fns library

## 🔧 Usage

### Getting Started
1. **Sign Up**: Create account with name, email, password, and interests
2. **Daily Challenges**: Complete default and custom challenges
3. **Track Progress**: View completion on calendar
4. **Connect Friends**: Search and add friends by name
5. **Partner Up**: Connect with a partner to track each other's progress
6. **Earn Rewards**: Complete weekly challenges for prizes

### Challenge Management
- **View**: See all challenges for selected date
- **Complete**: Click challenge to mark as done
- **Add**: Create custom challenges with categories
- **Edit**: Modify custom challenge text
- **Delete**: Remove custom challenges

### Social Features
- **Search**: Find users by typing their name
- **Friend Requests**: Send and receive connection requests
- **Partner Tracking**: Monitor partner's daily progress
- **Streak Competition**: Compare consecutive completion days

## 🎨 Design Features

- **Dark Theme**: Professional fintech-inspired design
- **Glassmorphism**: Modern translucent card effects
- **Responsive Layout**: Works on desktop and mobile
- **Smooth Animations**: Engaging user interactions
- **Visual Feedback**: Clear progress indicators

## 🔒 Data Privacy

- **Local Storage**: All data stored in browser
- **User Isolation**: Each user's data is separate
- **No External Database**: Complete privacy protection
- **Secure Authentication**: Password-protected accounts

## 🚀 Future Enhancements

- Real-time synchronization with Firebase
- Push notifications for challenges
- Advanced analytics and insights
- Challenge sharing and templates
- Group challenges and competitions
- Mobile app version

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Unsplash** for beautiful background images
- **Quotable API** for motivational quotes
- **React Team** for the amazing framework
- **Vite** for fast development experience

## 📞 Support

For questions or support, please open an issue in the repository.

---

**Built with ❤️ for personal growth enthusiasts**