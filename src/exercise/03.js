// Questions for the group:
//  - Why is useContext better suited to libraries vs individual apps (according to KCD)?
//       I kinda hate the composition thing that the Twitter guy used in the linked video.
//       It made the components look super bloated / removed some nice abstraction.
//       What if it was an element in a generated list that needed the current user?

// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

const CountContext = React.createContext()

function CountProvider(props) {
  const countAndSetCount = React.useState(0)
  return <CountContext.Provider value={countAndSetCount} {...props} />
}

function useCount() {
  const value = React.useContext(CountContext)

  if (value) {
    return value
  } else {
    throw new Error('You gotta use this inside a CountProvider')
  }
}

function CountDisplay() {
  const [count] = useCount()
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  const [, setCount] = useCount()
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}

export default App
