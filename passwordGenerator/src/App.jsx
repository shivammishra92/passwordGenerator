import { useState,useCallback,useEffect ,useRef} from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [charAllowed, setCharAllowed] = useState(false)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed)str += "0123456789"
    if(charAllowed)str += "`~!@#$%^&*()[]{}'?/+-"
    
    for (let i = 1; i <= length; i++) {
      let ch = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(ch)      
    }

    setPassword(pass)

  },[length,charAllowed,numberAllowed,setPassword])
  

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 9);
    window.navigator.clipboard.writeText(password)
  }, [password])


  useEffect(()=>{passwordGenerator()
  },[length,charAllowed,numberAllowed,passwordGenerator])



  return (
    
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-black" >
               <h1 className='text-orange-500 text-xl text-center my-3'>Password generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder="Password"
          readOnly
          ref={passwordRef} 
          />
          <button
           onClick={copyPassword}
           className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>

        <div className="flex text-sm gap-x-2">

          <div className="flex items-center gap-x-1">
            <input 
            type="range"
            min={7}
            max={20}
            value={length}
            className='cursor-pointer' 
            onChange={(e) => {
              setLength(e.target.value)}
            }
            />
            <label htmlFor="length" className='text-lg text-white'>Length:{length}</label>
          </div>
        

          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            className='cursor-pointer'
            onChange={()=>{
              setNumberAllowed((prev) => !prev)}
            }
            />
            <label htmlFor="numbers" className='text-lg text-white'>Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            className='cursor-pointer'
            onChange={()=>{
              setCharAllowed((prev) => !prev)}}
            />
            <label htmlFor="characters" className='text-lg text-white'>Characters</label>
          </div>
        </div>
    </div>
    
  )
}

export default App
