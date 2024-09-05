import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./Components/LoginSignup/login";
import SignUp from "./Components/LoginSignup/register";
import VideoPage from "./Components/LoginSignup/VideoPage";
import AudioPage from './Components/LoginSignup/AudioPage';

import Introduction from './Components/LoginSignup/Introduction';
import ControlStatements from './Components/LoginSignup/ControlStatements';
import DataStructures from './Components/LoginSignup/DataStructures';
import OOPS from './Components/LoginSignup/OOPS';
import AudioIntroduction from './Components/LoginSignup/AudioIntroduction';
import AudioControlStatements from './Components/LoginSignup/AudioControlStatements';
import AudioDataStructures from './Components/LoginSignup/AudioDataStructures';
import AudioOOPS from './Components/LoginSignup/AudioOOPS';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./Components/LoginSignup/profile"
import { useState } from "react";
import { auth } from "./Components/LoginSignup/firebase";
import GamePage from "./Components/LoginSignup/GamePage";
import AnimationPage from "./Components/LoginSignup/AnimationPage";
import Hangman from "./Components/LoginSignup/GameIntroduction";
import GameIntroduction from "./Components/LoginSignup/GameIntroExp";
import GameControlStatements from "./Components/LoginSignup/GameControlExp";
import Scramble from "./Components/LoginSignup/GameControlStatements";
import GameDataStructures from "./Components/LoginSignup/GameDsExp";
import Snake from "./Components/LoginSignup/GameDataStructures";
import GameOOP from "./Components/LoginSignup/GameOOPs";
import Crossword from "./Components/LoginSignup/Crossword";
import AnimationIntro from "./Components/LoginSignup/AnimationIntro";
import AnimationDs from "./Components/LoginSignup/AnimationDs";
import AnimationControl from "./Components/LoginSignup/AnimationControl";
import AnimationOOp from "./Components/LoginSignup/AnimationOOp";
import Progress from './Components/LoginSignup/Progress';


function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route
                path="/"
                element={user ? <Navigate to="/profile" /> : <Login />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/videos" element={<VideoPage />} />
              <Route path="/introduction" element={<Introduction/>} />
              <Route path="/control-statements" element={<ControlStatements/>} />
              <Route path="/data-structures" element={<DataStructures/>} />
              <Route path="/oops" element={<OOPS/>} />
              <Route path="/audio" element={<AudioPage/>} />
              <Route path="/audio-introduction" element={<AudioIntroduction/>} />
              <Route path="/audio-control-statements" element={<AudioControlStatements/>} />
              <Route path="/audio-data-structures" element={<AudioDataStructures/>} />
              <Route path="/audio-oops" element={<AudioOOPS/>} />
              <Route path="/games" element={<GamePage/>}/>
              <Route path="/animations" element={<AnimationPage/>}/>
              <Route path="/game-introduction" element={<GameIntroduction/>}/>
              <Route path="/playhangman" element={< Hangman/>}/>
              <Route path="/game-control-statements" element={<GameControlStatements/>}/>
              <Route path="/playscramble" element={<Scramble />}/>
              <Route path="/game-data-structures" element={<GameDataStructures/>}/>
              <Route path="/playsnake" element={<Snake/>}/>
              <Route path="/game-oops" element={<GameOOP/>}/>
              <Route path="/playcrossword" element={<Crossword/>}/>
              <Route path="/animation-introduction" element={<AnimationIntro/>}/>
              <Route path="/animation-data-structures" element={<AnimationDs/>}/>
              <Route path="/animation-control-statements" element={<AnimationControl/>}/>
              <Route path="/animation-oops" element={<AnimationOOp/>}/>
              <Route path="/Progress" element={<Progress/>}/>
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;