import React from 'react';
import { UserInterface } from '../../types/interfaces';
import './style.css';

export default class Card extends React.Component<UserInterface> {
  birthday: string;

  eyeStyle: { backgroundColor: string; color: string };
  hairStyle: { backgroundColor: string; color: string };
  constructor(props: UserInterface) {
    super(props);
    const bd = this.props.birthDate.split('-');

    console.log(this.props.hair);

    /* 
    black
    blond
    chestnut
    brown
    auburn
    */

    this.birthday = bd[2] + ' / ' + bd[1];
    this.eyeStyle = {
      backgroundColor:
        this.props.eyeColor.toLowerCase() === 'amber'
          ? '#d8870d'
          : this.props.eyeColor.toLowerCase() === 'brown'
          ? '#461907'
          : this.props.eyeColor.toLowerCase() === 'blue'
          ? '#2f4ac2'
          : this.props.eyeColor.toLowerCase() === 'green'
          ? '#2c4b17'
          : this.props.eyeColor.toLowerCase(),
      color: this.props.eyeColor.toLowerCase() === 'amber' ? 'black' : 'white',
    };
    this.hairStyle = {
      backgroundColor:
        this.props.hair.color.toLowerCase() === 'blond'
          ? '#e2cba8'
          : this.props.hair.color.toLowerCase() === 'brown'
          ? '#461907'
          : this.props.hair.color.toLowerCase() === 'chestnut'
          ? '#862c11'
          : this.props.hair.color.toLowerCase() === 'auburn'
          ? '#ff6600'
          : this.props.hair.color.toLowerCase(),
      color: this.props.hair.color.toLowerCase() === 'blond' ? 'black' : 'white',
    };
  }
  render(): React.ReactNode {
    return (
      <div className='card__wrapper'>
        <img src={this.props.image} alt='user image' />
        <div className='card__names'>
          <p>{this.props.firstName}</p>
          <p>{this.props.lastName}</p>
        </div>
        <div className='card-data__wrapper'>
          <p>
            <span className='card-data__property'>Gender:</span> {this.props.gender}
          </p>
          <p>
            <span className='card-data__property'>Age:</span> {this.props.age}
          </p>
          <p>
            <span className='card-data__property'>Birthday:</span> {this.birthday}
          </p>
          <p>
            <span className='card-data__property'>City:</span> {this.props.address.city}
          </p>
        </div>
        <div className='appearance__wrapper'>
          <div className='appearance__eyes' style={this.eyeStyle}>
            <span className='eyes__property'>{this.props.eyeColor}</span>
          </div>
          <div className='appearance__hair' style={this.hairStyle}>
            {' '}
            <span className='hair__property'>{this.props.hair.color}</span>
          </div>
        </div>
      </div>
    );
  }
}
