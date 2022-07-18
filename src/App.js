import './App.css';
import React, { useState, useCallback, useMemo } from 'react';

function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState({ name: "john" })
  const likeAction = () => setCount(current => current + 1)
  const memoizedlikeAction = useCallback(likeAction, [])

  const heavyProcess = (user) => {
    Sleep(2000)
    return user
  }

  const userProp = useMemo(() => heavyProcess(user), [user])

  console.log("Parent Components Rendered")

  return (
    <>
      <p>
        <i>-- Parent Components --</i>
      </p>
      <button onClick={likeAction}>
        Like {count}{" "}
      </button>
      <MemoizedChildComponent
        title="Hello"
        user={userProp}
        action={memoizedlikeAction} />
    </>
  );
}

function ChildComponent({ title, user, action }) {
  // Sleep(2000)
  console.log("Child Components Rendered")
  return (
    <>
      <p>
        <br />
        <i>-- Child Components --</i>
      </p>
      <h1>{title} {user.name}</h1>
      <button onClick={action}> Like </button>
    </>
  )
}

function compare(prevProps, nextProps) {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps)
}

const MemoizedChildComponent = React.memo(ChildComponent)

function Sleep(milliseconds) {
  const date = Date.now()
  let currentDate = null
  do {
    currentDate = Date.now()
  } while (currentDate - date < milliseconds)

}

export default App;
