import React, { Component } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { toast } from "react-toastify"
import {
    Button,
    Classes,
    Drawer,
    Position,
} from "@blueprintjs/core";

toast.configure()

class EditProfile extends Component {
    static contextType = ThemeContext
    state = {
        user: [],
        name: "",
        email: "",
        bio: "",
        profilePic: "",
        url: "",
        autoFocus: true,
        canEscapeKeyClose: true,
        canOutsideClickClose: true,
        enforceFocus: true,
        hasBackdrop: true,
        isOpen: false,
        position: Position.RIGHT,
        size: undefined,
        usePortal: true,
        oldPassword:"",
        newPassword:""

    }
    componentDidMount() {
        fetch("http://localhost:8080/mypost",
            {
                headers: {
                    "Authorization": localStorage.getItem("jwt")
                }
            }).then(res =>
                res.json())
            .then(json => {
                this.setState({ user: json.user })
                this.setState({ name: json.user.name })
                this.setState({ email: json.user.email })
                this.setState({ bio: json.user.bio })
                this.setState({ profilePic: json.user.profilePic })


            });

    }

    render() {
        const upload = () => {
            const data = new FormData()
            data.append("file", this.state.profilePic)
            data.append("upload_preset", "instagram")
            data.append("cloud_name", "dqmpbgxs3")
            fetch("https://api.cloudinary.com/v1_1/dqmpbgxs3/image/upload", {
                method: "post",
                body: data
            }).then(res => res.json())
                .then(data => {

                    this.setState({ url: data.url })
                    required()
                })
                .catch(err => {
                    console.log(err)
                })
        }
        const required = () => {
            fetch(`http://localhost:8080/update/${this.state.user._id}`,
                {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    }, body: JSON.stringify({
                        name: this.state.name,
                        email: this.state.email,
                        profilePic: this.state.url,
                        bio: this.state.bio
                    })
                }).then(res => res.json()).then(
                    data => {
                        if (data.error) {
                            toast.error(data.error + "🔄", {
                                className: "toasti",
                                draggable: false,
                                position: toast.POSITION.TOP_CENTER
                            })
                        }
                        else {
                            toast.info("Updating Profile", {
                                className: "toasti",
                                draggable: false,
                                position: toast.POSITION.TOP_CENTER
                            })
                        }

                    }).catch(err => {
                        console.log(err)
                    })

        }


        const update = () => {

            upload()


        }
        const handleOpen = () => this.setState({ isOpen: true });
        const handleClose = () => this.setState({ isOpen: false });

        const ChangePassword=()=>{
            fetch(`http://localhost:8080/change`,
                {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    }, body: JSON.stringify({
                       
                        email: this.state.email,
                        oldPassword:this.state.oldPassword,
                        newPassword:this.state.newPassword
                    })
                }).then(res => res.json()).then(
                    data => {
                        if (data.error) {
                            toast.error(data.error + "🔄", {
                                className: "toasti",
                                draggable: false,
                                position: toast.POSITION.TOP_CENTER
                            })
                        }
                        else {
                            toast.info("Password Changed", {
                                className: "toasti",
                                draggable: false,
                                position: toast.POSITION.TOP_CENTER
                            })
                        }

                    }).catch(err => {
                        console.log(err)
                    })


        }

        const { isLightTheme, light, dark } = this.context
        const theme = isLightTheme ? light : dark
        return (
            <div>
                <div style={{ width: "670px", height: "550px", background: theme.ib, color: theme.syntax, marginTop: "100px" }} className="container">
                    <h2 className="bp3-navbar-heading" style={{ marginLeft: "80px" }}>Instabook</h2>


                    <form>
                        <label >Full Name</label>
                        <input type="text" id="fname" name="name" placeholder="Your name.." value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />

                        <label >Email</label>
                        <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} />

                        <label >Profile Picture</label>
                        <input type="file" name=" Picture" onChange={(e) => { this.setState({ profilePic: e.target.files[0] }) }} />

                        <label >InstaBook Bio</label>
                        <textarea id="subject" name="subject" placeholder="Write something.." style={{ height: "100px" }}
                            value={this.state.bio} onChange={(e) => { this.setState({ bio: e.target.value }) }}
                        ></textarea>

                        <input style={{ width: "200px" }} type="submit" value="Update" onClick={(e) => { e.preventDefault(); update(); }} />


                    </form>
                    <Button style={{background:theme.ui,color:theme.syntax}} onClick={handleOpen}>Change Password</Button>
                    <Drawer
                        className={theme.pop}
                        icon="info-sign"
                        onClose={handleClose}
                        title="Change Password"
                        {...this.state}
                        style={{width:"400px"}}
                    >
                        <div className={Classes.DRAWER_BODY}>
                            <div className={Classes.DIALOG_BODY}>
                                <form>
                                    <label >Email</label>
                                    <input style={{border:theme.bor}}  type="email" name="email" placeholder="Email" value={this.state.email} />
                                    <label >Old Password</label>
                                    <input style={{border:theme.bor}} type="Password" name="password" placeholder="old password" value={this.state.oldPassword} onChange={(e) => this.setState({oldPassword:e.target.value})} />
                                    <label >New Password</label>
                                    <input style={{border:theme.bor}} type="Password" name="password" placeholder="new password" value={this.state.newPassword} onChange={(e) => this.setState({newPassword:e.target.value})} />
                                    <Button onClick={ChangePassword}>Change Password</Button>
                                </form>

                            </div>
                        </div>
                        <div className={Classes.DRAWER_FOOTER}>InstaBook</div>
                    </Drawer>
                </div>


            </div>
        );
    }
}

export default EditProfile;