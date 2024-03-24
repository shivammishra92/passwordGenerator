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
      let ch = Math.floor(Math.random()*str.length+1);
      pass += str.charAt(ch)      
    }

    setPassword(pass)

  },[length,charAllowed,numberAllowed,setPassword])
  

  const copyPassword=useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },
  [password])

  useEffect(()=>{passwordGenerator()},
  [length,charAllowed,numberAllowed,passwordGenerator])



  return (
    
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-1 py-3 my-8 bg-gray-800
      text-white'>
         <h1 className='text-orange-500 text-3xl text-center my-3'>Password generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text"
          value={password}
          placeholder='Generated Password'
          readOnly
          className='outline-none w-full py-1 px-3'
          ref={passwordRef} 
          />
          <button
           onClick={copyPassword}
           className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>

        <div className="flex text-sm gap-x-2">

          <div className="flex items-center gap-x-1">
            <input type="range"
            value={length}
            min={7}
            max={20}
            className='cursor-pointer' 
            onChange={(e) => {
              setLength(e.target.value)}
            }
            />
            <label htmlFor="length" className='text-xl'>Length:{length}</label>
          </div>
        

          <div className="flex items-center gap-x-1">
            <input type="checkbox"
            defaultChecked={numberAllowed}
            className='cursor-pointer'
            onChange={()=>{
              setNumberAllowed((prev) => !prev)}
            }
            />
            <label htmlFor="numbers" className='text-xl'>Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox"
            defaultChecked={charAllowed}
            className='cursor-pointer'
            onChange={()=>{
              setCharAllowed((prev) => !prev)}
            }
            />
            <label htmlFor="characters" className='text-xl'>Characters</label>
          </div>

        </div>

    </div>
    
  )
}

export default App
