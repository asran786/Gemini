
import { createContext, useState } from 'react';
import run from '../config/gemini';

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState('');
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState('');
    const [error, setError] = useState(false);
    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };
    
const newChat=()=>{
    setLoading(false);
    setShowResult(false);
    setInput("")
}
    const onSent = async (prompt) => {
        setResultData('');
        setLoading(true);
        setShowResult(true);
        let response;
        // console.log(typeof prompt)
        try {
            if (prompt !== undefined) {
                response = await run(prompt);
        console.log(typeof response)

                setRecentPrompt(prompt);
            } else {
                setPrevPrompt(prev => [...prev, input]);
                setRecentPrompt(input);
                response = await run(input.toString());
                
            }
            const responseArray=response.split("**");
            let newResponse="";
            for(let i=0;i<responseArray.length; i++){
                if(i===0 || i%2!==1)
                    newResponse+=responseArray[i];
                else
                newResponse+="<b>"+responseArray[i]+"</b>"
            }
            let newResponse2=newResponse.split("*").join("</br>")
           let newResponseArray=newResponse2.split(" ");
           for(let i=0;i<newResponseArray.length;i++){
            const nextWord=newResponseArray[i]
            delayPara(i,nextWord+" ")
           }

          
        } catch (error) {
            console.error('Error in onSent:', error);
        } finally {
            setLoading(false);
            setInput('');
        }
    };
  
    const contextValue = {
        input,
        recentPrompt,
        prevPrompt,
        setPrevPrompt,
        showResult,
        loading,
        resultData,
        onSent,
        setInput,
        setRecentPrompt,
        setShowResult,
        setLoading,
        setResultData,
        newChat,
        error,
         setError
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
