/**
 * Created by peter on 28.01.17.
 */
import React, {Component} from 'react';
import {
  Button, ControlLabel, FormControl,
  PageHeader, Row
} from 'react-bootstrap';
import {
  SortableContainer, SortableElement, SortableHandle, arrayMove
}
  from 'react-sortable-hoc';
import './dragHandle.css'


export class SortableComponent extends Component {
  state = {
    items: ['Question 1', 'Question 2', 'Question 3']
  };

  DragHandle = SortableHandle(() =>
    <span className="grippy"></span>
  );

  SortableItem = SortableElement(({value,key}) =>
    <Row>
      <this.DragHandle/>
      <ControlLabel>Question</ControlLabel>
      <FormControl
        componentClass="textarea"
        placeholder="Enter question"
        onChange={()=> {
          console.log(key);       //why undefined??
          console.log(value);
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
                             value={value}/>
        )}
      </div>
    );
  });

  addElement() {
    const newState = Object.assign({}, {
      items: [...this.state.items,
        'Question ' + (this.state.items.length + 1)]
    });
    this.setState(newState);
  }

  setFieldState(event, key) {
    console.log('event', event);
    console.log('key', key);
    let len = this.state.items.length;
    const newState = Object.assign({}, {
      items: [
        ...this.state.items.slice(0, key),
        'Question new' + (len + 1)],
      ...this.state.items.slice(key, len)
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
