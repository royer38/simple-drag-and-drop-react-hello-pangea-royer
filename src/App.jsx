//debemos importar los componentes
import{DragDropContext, Droppable, Draggable} from '@hello-pangea/dnd';
import { useEffect, useState } from "react";

const App = () => { 

  const initialTareas = JSON.parse (localStorage.getItem ('tareas')) || []
const [tareas, setTareas] = useState (initialTareas)

useEffect(() => {
localStorage.setItem('tareas', JSON.stringify(tareas));
}, [tareas]);
//esto nos sirve para tener los datos de los elementos que movemos o con los que interacturamos
//la evalucion es para evitar que se rompa la app
const handleDragEnd = result => {
  if (!result.destination) return;
  const starIndex = result.source.index
  const endIndex = result.destination.index

  //splice, cambia el contenido de una array y es nativo de js, elimina y/o agrega nuevos elementos
  const copyArray = [...tareas]
  const [reorderItem] = copyArray.splice(starIndex, 1);
  //destructuring= inicializa las variables de los elementos, ya sea array o un objeto (basta con agregagarle los corchetes)
copyArray.splice(endIndex, 0, reorderItem);

setTareas(copyArray);
};

//aca lo obtenemos como un props, en el que el elemnto llama nuestra constante
  return (
    <DragDropContext onDragEnd={handleDragEnd }>
    <h1>drag and drop app</h1>
    {/*el dropable siempre si o si, debe devolver una funcion, caso contrario la app no se ejecuta */}
    <Droppable droppableId='tareas'>
      {
        (droppableProvider) => (
          <ul ref={droppableProvider.innerRef} {...droppableProvider.droppableProps}>
          {
            tareas.map((tarea, index) => (
              <Draggable index={index} key={tarea.id} draggableId={`${tarea.id}`}>
                {
                  (draggableProvider) => (
                    <li ref={draggableProvider.innerRef}
                    {...draggableProvider.dragHandleProps}
                    {...draggableProvider.draggableProps}
                    >{tarea.Text}</li>

                   )
                } 
              </Draggable>
            ))}
{droppableProvider.placeholder}
        </ul>
        )
      }
    </Droppable>
    </DragDropContext>
    
  )
 }

 export default App;

 //template string siempre regresa un string, es deci interpolamos una variable para hacerla string, en el caso del id