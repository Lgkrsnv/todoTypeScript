import React, {useState, useEffect} from 'react';
import Card, { CardVariant } from './components/Card';
// import { UserList } from './components/UserList';
// import { Component } from './components/Component';
import List from './components/List';
import {UserItem} from './components/UserItem'
import { IUser } from './types/types';
import { withErrorBoundary } from 'react-error-boundary'
import  TodoList from './components/TodoList';
import { Form } from './components/Form';
import {fetchTodos} from './store/todoSlice'
import { useDispatch, useSelector } from 'react-redux';
import {RootState} from './index'
import CircularIndeterminate from './components/CircularIndeterminate';

function App() {
  const dispatch = useDispatch();
  
  const status = useSelector((state:RootState) => state.todos.status)
  console.log(status, 'status');
  
  
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()).then(users => setUsers(users));
    dispatch(fetchTodos());
  }, [dispatch])
  useEffect(() => {
    console.log(`users`, users)
  }, [users])



  return (
    <div className="App">
      {status === 'pending' && <CircularIndeterminate />}
      <Card width='100px' height='200px' variant={CardVariant.outlined} >
        <button onClick={() => { throw new Error('BOOM!')}}>Button</button>
      </Card>
      {/* <UserList users={users}></UserList> */}
      <List items={users} renderItem={(user: IUser)=><UserItem user={user} key={user.id} />} />
      <Form />
      <TodoList />
    </div>
  );
}

export default withErrorBoundary(App, {
  // fallback: <div> Smth went wrong</div>,
  fallbackRender: () => <div>Ошибка</div>,
});
