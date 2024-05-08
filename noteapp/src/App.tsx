import "./App.css";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


function App() {
  return (
    <>
      <div className="pdf-title">
        <h1>Pdf name goes here</h1>
      </div>

      <div className = "pdf-div">
        <iframe src="https://research.google.com/pubs/archive/44678.pdf" width="700" height="600"></iframe>
        <div className="button-container">
            <button className="upvote">
              <img src="./src/assets/like.png" alt="Upvote" />
            </button>
            <button className="downvote">
              <img src="./src/assets/dislike.png" alt="Downvote" />
            </button>
            <button className="share">
              <img src="./src/assets/share.png" alt="Share" />
            </button>        
        </div>
        <div className="feedback-text">
          <Label htmlFor="message-2">Did this note help you? We would really appreciate your feedback.</Label>
          <div className="comment-area">
            <Textarea placeholder="Write your thoughts here." id="message-2" style={{ width: '700px' , height: '150px'}}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App
