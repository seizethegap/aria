import React from 'react';
import Axios from 'axios';

class Join extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name : '',
            password : '',
            email: ''
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePwChange = this.handlePwChange.bind(this);
    }

    resetForm = () => {
        this.setState({name : "", password : "", email : ""});
    }
    
    register(event) {
        event.preventDefault();

        let newUser = {
          name : this.state.name,
          password : this.state.password,
          email : this.state.email
        }
        Axios.post('http://localhost:2999/Join', newUser).then((response) => {
            console.log(response.data);

            if (response.data.success) {
                console.log("Successful Register");
                this.props.close();
            } else {
                console.log("Failed to Register");
                console.log(response.data.error);
                this.props.close();
            }
            this.resetForm();
        });
    }

    handleClick(event) {
        this.props.close();
        this.props.openReset();
    }

    handleNameChange(event) {
        this.setState({name : event.target.value});
    }

    handlePwChange(event) {
      this.setState({password : event.target.value});
    }

    handleEmailChange(event) {
      this.setState({email : event.target.value});
    }

    render() {
        if (!this.props.open) {
            this.state = {
                error: []
            };
            return null;
        }

        /*
        if (this.state.error.length) {
            var alert = (
                <div className="alert">{this.state.error}</div>
            );
        }*/

        return (
            <div className="login">
                <form onSubmit={this.register.bind(this)} ref="form">
                    <div className="prompt-close" onClick={this.props.close}>&#10006;</div>
                    <div className="prompt-title">Registration</div>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input className="text" name="name" type="text" value={this.state.name} onChange = {this.handleNameChange}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input className="password" name="password" type="password" value={this.state.password} onChange = {this.handlePwChange}/>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input className="text" name="email" type="text" value={this.state.email} onChange = {this.handleEmailChange}/>
                    </div>
                    {alert}
                    <input className="button" type="submit" value="Register" />
                </form>
            </div>
        );
    }
}

export default Join;
