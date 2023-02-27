import { observer } from "mobx-react-lite"
import counter from "../MobX/store/counter"

const Counter = observer(() => {
  return (
    <div>
      {counter.count}
      <button onClick={() => counter.decrement()}>-</button>
      <button onClick={() => counter.increment()}>+</button>
      <button onClick={() => counter.fetching()}>+</button>

      {counter.resp.map((resp) => (
        <>{resp.id}</>
      ))}
    </div>
  )
})

export default Counter
