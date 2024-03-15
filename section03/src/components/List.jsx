import React, {useMemo, useState} from 'react';
import './List.css'
import TodoItem from "./TodoItem.jsx";

const List = ({todos , onUpdate, onDelete}) => {

    const [search, setSearch] = useState("");

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    const getFilteredDate = () => {
        if (search === "") {
            return todos;
        }
        return todos.filter((todo) => todo.content.toLowerCase().includes(search.toLowerCase()));
    };

    const filteredTodos = getFilteredDate();

    const {totalCount, doneCount, notDoneCount} =
        useMemo(() => {
            console.log("호출");
            const totalCount = todos.length;
            const doneCount = todos.filter((todo) => todo.isDone).length;
            const notDoneCount = totalCount - doneCount;
            return {
                totalCount,
                doneCount,
                notDoneCount,
            };
            //속성명 축약 -> key값과 할당하는 변수의 이름 같으면 위와 같이 객체 축약 가능
        }, [todos]);

    // const {totalCount, doneCount, notDoneCount} = getAnalyzedData();

    return (
        <div className="List">
            <h4>Todo List 🌱</h4>
            <div>
                <div>total: {totalCount}</div>
                <div>done: {doneCount}</div>
                <div>notDone: {notDoneCount}</div>
            </div>
            <input
                value={search}
                onChange={onChangeSearch}
                placeholder="검색어를 입력하세요"
            />
            <div className="todos_wrapper">
                {filteredTodos.map((todo) => {
                    // return <div>{todo.content}</div>;
                    return (
                        <TodoItem
                            key={todo.id}
                            {...todo}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                        />
                    );

                })}
            </div>
        </div>
    );
};


export default List;