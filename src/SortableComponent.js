/**
 * Created by peter on 28.01.17.
 */
import React, {Component} from 'react';
import {Button, FormControl, Panel, Row} from 'react-bootstrap';
import {
  SortableContainer, SortableElement, arrayMove
}
  from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) => <Panel>{value}</Panel>);

const SortableList = SortableContainer(({items}) => {
  return (
    <Panel>
      {items.map((value, index) =>
        <SortableItem key={`item-${index}`}
                      index={index}
                      value={value}/>
      )}
    </Panel>
  );
});

export class SortableComponent extends Component {
  state = {
    field: '',
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
  };

  addElementToList() {
    const newState = Object.assign({}, {
      items: [...this.state.items, this.state.field]
    });
    this.setState(newState);
  }

  setFieldState(event) {
    this.setState({field: event.target.value})
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex)
    });
  };

  render() {
    return (
      <div>
        <Row>
          <FormControl
            type="text"
            value={this.state.field}
            placeholder="Enter text"
            onChange={this.setFieldState.bind(this)
            }
          />
          <Button bsStyle="primary"
                  bsSize="large"
                  onClick={this.addElementToList.bind(this)}
          >Add to list</Button>
        </Row>
        <SortableList
          items={this.state.items}
          onSortEnd={this.onSortEnd}/>

      </div>
    )

  }
}
