import MainNavigation from './components/navigation/MainNavigation';
import TasksList from './components/tasks/TasksList';
import { TasksContextProvider } from './store/TasksContextProvider';

function App() {
    return (
        <TasksContextProvider>
            <>
                <MainNavigation />
                <TasksList />
            </>
        </TasksContextProvider>
    );
}

export default App;
