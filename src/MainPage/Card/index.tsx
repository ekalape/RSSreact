import React from 'react';
import UserData from 'utils/UserData';
import './style.css';

export default class Card extends React.Component<UserData> {
  birthday: string;
  eyeStyle: { backgroundColor: string; color: string };
  hairStyle: { backgroundColor: string; color: string };
  constructor(props: UserData) {
    super(props);

    this.birthday = this.props.birthday;

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
        this.props.hairColor.toLowerCase() === 'blond'
          ? '#e2cba8'
          : this.props.hairColor.toLowerCase() === 'brown'
          ? '#461907'
          : this.props.hairColor.toLowerCase() === 'chestnut'
          ? '#862c11'
          : this.props.hairColor.toLowerCase() === 'auburn'
          ? '#ff6600'
          : this.props.hairColor.toLowerCase(),
      color: this.props.hairColor.toLowerCase() === 'blond' ? 'black' : 'white',
    };
  }
  render(): React.ReactNode {
    const image = this.props.image;
    let src = '';
    if (typeof image === 'string') src = image;
    else if (image instanceof File) src = URL.createObjectURL(image);
    return (
      <div className="card__wrapper">
        <img src={src} alt="user image" />
        <div className="card__names">
          <p>{this.props.firstName}</p>
          <p>{this.props.lastName}</p>
        </div>
        <div className="card-data__wrapper">
          <p>
            <span className="card-data__property">Gender:</span> {this.props.gender}
          </p>
          <p>
            <span className="card-data__property">Age:</span> {this.props.age}
          </p>
          <p>
            <span className="card-data__property">Birthday:</span> {this.birthday}
          </p>
          <p>
            <span className="card-data__property">Hair type:</span> {this.props.hairType}
          </p>
          <p>
            <span className="card-data__property">City:</span> {this.props.city}
          </p>
        </div>
        <div className="appearance__wrapper">
          <div className="appearance__eyes" style={this.eyeStyle}>
            <span className="eyes__property">{this.props.eyeColor}</span>
          </div>
          <div className="appearance__hair" style={this.hairStyle}>
            {' '}
            <span className="hair__property">{this.props.hairColor}</span>
          </div>
        </div>
      </div>
    );
  }
}
