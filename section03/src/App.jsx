import './App.css'
import Header from "./components/Header.jsx";
import Editor from "./components/Editor.jsx";
import List from "./components/List.jsx";
import {createContext, useCallback, useMemo, useReducer, useRef, useState} from "react";

const mockData = [
    {
        id: 0,
        isDone: false,
        content: "React 공부하기",
        date: new Date().getTime(),
    },
]

function reducer(state, action) {
    switch (action.type) {
        case 'CREATE' :
            return [...state, action.data];
        case 'UPDATE':
            return state.map((item) => item.id === action.targetId ? {...item, isDone: !item.isDone} : item);
        case 'DELETE':
            return state.filter((item) => item.id !== action.targetId);
        default:
            return state;
    }
}

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();
function App() {
    // const [todos, setTodos] = useState(mockData);
    const [todos, dispatch] = useReducer(reducer, mockData);
    const idRef = useRef(3);

    const onCreate = useCallback((content) => {
        /*
                const newTodo = {
                    id : idRef.current++,
                    isDone: false,
                    content: content,
                    date: new Date().getTime(),
                }
                setTodos([newTodo, ...todos]);
         */
        dispatch({
            type: "CREATE",
            data: {
                id: idRef.current++,
                isDone: false,
                content: content,
                date: new Date().getTime(),
            }
        });
    }, []);

    const onUpdate = useCallback((targetId) => {
        // todos state의 값들 중에
        // targetId와 일치하는 id를 갖는 투두 아이템의 isDone 변경
        // 인수 : todos 배열에서 targetId와 일치하는 id를 갖는 요소의 데이터만 딱 바꾼 새로운 배열

        // setTodos(todos.map((todo)=>todo.id === targetId? {...todo, isDone: !todo.isDone} : todo))
        dispatch({
            type: "UPDATE",
            targetId: targetId,
        });
    }, []);


    const onDelete = useCallback((targetId) => {
        dispatch({
            type: "DELETE",
            targetId: targetId,
        })
        // setTodos(todos.filter((todo) => todo.id !== targetId));
    }, []);

    const memoizedDispatch = useMemo(() => {
        return {onCreate, onUpdate, onDelete};
    }, []);
    return (
        <div className="App">
            <Header/>
            <TodoStateContext.Provider value={todos}>
                <TodoDispatchContext.Provider
                    value={memoizedDispatch}jdklsf
                >
                    <Editor/>
                    <List/>
                </TodoDispatchContext.Provider>
            </TodoStateContext.Provider>
        </div>
    );
}

export default App
