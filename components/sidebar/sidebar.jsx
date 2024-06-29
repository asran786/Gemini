import { useState } from "react";
import { assets } from "../../src/assets/assets";
import { Context } from "../../src/context/context";
import { useContext } from "react";
import "./sidebar.css";
const Sidebar = () => {
  const [Extended, setExtended] = useState(true)


  const {
    prevPrompt,
    onSent,
    setRecentPrompt,
    newChat,
    setShowResult,
    setError,
    setPrevPrompt,
    input
    
} = useContext(Context);

const LoadPrompt=async(prompt)=>{
  console.log(prompt)
setRecentPrompt(prompt)
let res= await onSent(prompt)
 console.log(res)
}
  return (
    <div className="sidebar">
      <div className="top">
        <img onClick={()=>setExtended(prev=>!prev)} className="menu" src={assets.menu_icon} alt="" />

        <div onClick={newChat} className="new-chat">
          <img src={assets.plus_icon} alt="" />
         {Extended? <p>New Chat</p>:null}
        </div>
 
{Extended? <div className="recent">
    <p className="recent-title">Recent</p>
    {
      prevPrompt.map((item,index)=>{
        return(
          <div key={index} onClick={() => {
            setShowResult(true)
            setError(false)
            LoadPrompt(item)

          }} className="recent-entry">
      <img src={assets.message_icon} alt="" />
      <p>{item.slice(0, 18)}...</p>
    </div>
        )
      })
    }
    
 </div>:null}

      </div>

      <div className="bottom">

<div className="bottom-item recent-entry">
    <img src={assets.question_icon} alt="" />
    {Extended?<p className="Help">Help</p>:null}
</div>
<div className="bottom-item recent-entry">
    <img src={assets.history_icon} alt="" />
  {Extended?  <p className="Help">Activity</p>:null}
</div>
<div className="bottom-item recent-entry">
    <img src={assets.question_icon} alt="" />
   {Extended? <p className="Help">Setting</p>:null}
</div>

      </div>
    </div>
  );
};

export default Sidebar;
