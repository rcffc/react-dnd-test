/**
 * Created by peter on 28.01.17.
 */
import React, {Component} from 'react';
import {
  Button, FormControl,
  PageHeader, Row
} from 'react-bootstrap';
import {
  SortableContainer, SortableElement, SortableHandle, arrayMove
}
  from 'react-sortable-hoc';
import './dragHandle.css'


export class SortableComponent extends Component {
  state = {
    items: ['']
  };

  DragHandle = SortableHandle(() =>
    <span className="grippy"></span>
  );

  SortableItem = SortableElement(({value, myIndex}) =>
    <Row>
      <this.DragHandle/>
      <FormControl
        componentClass="textarea"
        placeholder="Enter question"
        onChange={(event)=> {
          this.setFieldState(myIndex, event);
        }
        }
      />
    </Row>);

  SortableList = SortableContainer(({items}) => {
    return (
      <div>
        {items.map((value, index) =>
          <this.SortableItem key={`item-${index}`}
                             index={index}
                             value={value}
                             myIndex={index}/>
        )}
      </div>
    );
  });

  addElement() {
    const newState = Object.assign({}, {
      items: [...this.state.items, '']
    });
    this.setState(newState);
  }

  setFieldState(key, event) {
    let len = this.state.items.length;
    const newState = Object.assign({}, {
      items: [
        ...this.state.items.slice(0, key),
        event.target.value,
        ...this.state.items.slice(key + 1, len)]
    });
    this.setState(newState)
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex)
    });
  };

  createTask() {
    console.log(this.state.items);
  }

  render() {
    return (
      <div>
        <PageHeader>
          Create Task
        </PageHeader>
        <this.SortableList
          items={this.state.items}
          onSortEnd={this.onSortEnd}
          useDragHandle={true}/>

        <Button bsStyle="primary"
                bsSize="large"
                onClick={this.addElement.bind(this)}
        >Add new question</Button>
        {' '}
        <Button bsStyle="primary"
                bsSize="large"
                onClick={this.createTask.bind(this)}
        >Create Task</Button>

      </div>
    )

  }
}
