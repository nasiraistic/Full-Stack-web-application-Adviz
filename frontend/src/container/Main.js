import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./main.css";
import switchScreens from "./LoginBtn";

var currentUser = "";
var id = "";
var title = "";
var firstname = "";
var surname = "";
var street = "";
var postalcode = "";
var city = "";
var country = "";
var email = "";
var moreInfos = "";
var selected = "";
var checked = false;
var ownerId = "";
var form;
var element = "";
var markers = [{ marker: [52.520008, 13.404954], name: "Berlin" }]; // default marker at Berlin

var myIcon = L.icon({
  iconUrl:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=",
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
});
/**
 *  Main class
 */
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      forename: "",
      surname: "",
      street: "",
      postalcode: "",
      city: "",
      country: "",
      email: "",
      moreInfos: "",
      privateFlag: false,
      userSelect: "",
      ownerId: "",
      // get currentUser from Login class
      currentUser: props.currentUser,
      contact: [],
    };

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeSurname = this.onChangeSurname.bind(this);
    this.onChangeStreet = this.onChangeStreet.bind(this);
    this.onChangePostalcode = this.onChangePostalcode.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeInfos = this.onChangeInfos.bind(this);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    this.onChangeUserselect = this.onChangeUserselect.bind(this);
    this.onChangeOwnerId = this.onChangeOwnerId.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.cancle = this.cancle.bind(this);
    this.cancleUpdate = this.cancleUpdate.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.ref = React.createRef();
  }
  // send new user to server
  onAdd(e) {
    e.preventDefault();
    ReactDOM.unmountComponentAtNode(form);
    var userObject;
    if (currentUser == "admina") {
      userObject = {
        title: this.state.title,
        gender: this.state.userSelect,
        forename: this.state.forename,
        surname: this.state.surname,
        street: this.state.street,
        postalcode: this.state.postalcode,
        city: this.state.city,
        country: this.state.country,
        email: this.state.email,
        moreInfos: this.state.moreInfos,
        privateFlag: this.state.privateFlag,
        ownerId: this.state.ownerId,
      };
    } else if (currentUser == "normalo") {
      userObject = {
        title: this.state.title,
        gender: this.state.userSelect,
        forename: this.state.forename,
        surname: this.state.surname,
        street: this.state.street,
        postalcode: this.state.postalcode,
        city: this.state.city,
        country: this.state.country,
        email: this.state.email,
        moreInfos: this.state.moreInfos,
        privateFlag: this.state.privateFlag,
        ownerId: "normalo",
      };
    }

    console.log(userObject);
    axios
      .post("http://localhost:9000/adviz/contacts", userObject)
      .then((res) => {
        console.log(res.data);
        switchScreens("main", "add");
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({
      title: "",
      forename: "",
      surname: "",
      street: "",
      postalcode: "",
      city: "",
      country: "",
      email: "",
      moreInfos: "",
      privateFlag: false,
      userSelect: "",
      ownerId: "",
    });
  }

  cancle() {
    switchScreens("main", "add");
    ReactDOM.unmountComponentAtNode(form);
    element = "";
  }
  cancleUpdate() {
    switchScreens("main", "update");
    ReactDOM.unmountComponentAtNode(form);
    element = "";
    this.setState({
      title: "",
      forename: "",
      surname: "",
      street: "",
      postalcode: "",
      city: "",
      country: "",
      email: "",
      moreInfos: "",
      privateFlag: false,
      userSelect: "",
      ownerId: "",
    });
  }
  // send updated data to server
  onSubmit(e) {
    e.preventDefault();
    ReactDOM.unmountComponentAtNode(form);
    var updatedContact;
    if (currentUser == "admina") {
      updatedContact = {
        title: title,
        gender: selected,
        forename: firstname,
        surname: surname,
        street: street,
        postalcode: postalcode,
        city: city,
        country: country,
        email: email,
        moreInfos: moreInfos,
        privateFlag: checked,
        ownerId: ownerId,
      };
    } else if (currentUser == "normalo") {
      updatedContact = {
        title: title,
        gender: selected,
        forename: firstname,
        surname: surname,
        street: street,
        postalcode: postalcode,
        city: city,
        country: country,
        email: email,
        moreInfos: moreInfos,
        privateFlag: checked,
        ownerId: "normalo",
      };
    }
    console.log(updatedContact);

    axios
      .put("http://localhost:9000/adviz/contacts/" + id, updatedContact)
      .then((res) => {
        console.log("sent!");
        console.log(res);
        switchScreens("main", "update");
      })
      .catch((error) => {
        console.log(error);
      });
    element = "";
    this.setState({
      title: "",
      forename: "",
      surname: "",
      street: "",
      postalcode: "",
      city: "",
      country: "",
      email: "",
      moreInfos: "",
      privateFlag: false,
      userSelect: "",
      ownerId: "",
    });
  }
  // send delete user data to server
  onDelete(e) {
    e.preventDefault();
    ReactDOM.unmountComponentAtNode(form);

    axios
      .delete("http://localhost:9000/adviz/contacts/" + id)
      .then((res) => {
        console.log("sent!");
        console.log(res);
        switchScreens("main", "update");
      })
      .catch((error) => {
        console.log(error);
      });
    element = "";
    id = "";
    title = "";
    firstname = "";
    surname = "";
    street = "";
    postalcode = "";
    city = "";
    country = "";
    email = "";
    moreInfos = "";
    selected = "";
    ownerId = "";
    checked = false;
    this.setState({
      title: "",
      forename: "",
      surname: "",
      street: "",
      postalcode: "",
      city: "",
      country: "",
      email: "",
      moreInfos: "",
      privateFlag: false,
      userSelect: "",
      ownerId: "",
    });
  }

  logout() {
    switchScreens("loginScreen", "main");
    /*document.getElementById("buttons").style.display = "none";
    document.getElementById("header").style.display = "none";*/
    window.location.reload(false);
    ReactDOM.unmountComponentAtNode(this.ref.current);
    markers = [{ marker: [52.520008, 13.404954], name: "Berlin" }];
  }
  // generate latitude and longtitude from addresses
  geocode(street, postalcode, city, country, names) {
    let adrs =
      "street=" +
      street +
      "&postalcode=" +
      postalcode +
      "&city=" +
      city +
      "&country=" +
      country;
    axios
      .get("https://nominatim.openstreetmap.org/search?format=json&" + adrs)
      .then((res) => {
        var data = res.data;
        console.log(data);
        var obj = JSON.parse(JSON.stringify(data));
        console.log(obj);
        var lat = obj[0].lat;
        var lng = obj[0].lon;
        var marker = [parseFloat(lat), parseFloat(lng)];
        var all = [{ marker: marker, name: names }];

        markers = markers.concat(all);
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // show own contact of the user
  showOwn() {
    axios
      .get("http://localhost:9000/adviz/contacts/own/" + currentUser)
      .then((res) => {
        var data = res.data;
        const listContainer = this.ref.current;
        ReactDOM.unmountComponentAtNode(listContainer);
        console.log(data);
        var contacts = [];
        var bb = [];
        this.setState({ contact: [] });
        for (var i = 0; i < data.length; i++) {
          contacts[i] = [
            data[i]._id,
            data[i].Title,
            data[i].gender,
            data[i].Firstname,
            data[i].Surename,
            data[i].Street,
            data[i].postalcode,
            data[i].city,
            data[i].country,
            data[i].email,
            data[i].moreInfos,
            data[i].privateFlag,
            data[i].ownerId,
          ];
          this.setState({ contact: this.state.contact.concat([contacts[i]]) });

          const names = data[i].Firstname + " " + data[i].Surename;

          this.geocode(
            data[i].Street,
            data[i].postalcode,
            data[i].city,
            data[i].country,
            names
          );

          var btn = React.createElement(
            "button",
            {
              style: {
                width: "100%",
                background: "#5C3DFA",
              },
              onClick: () => {
                this.switchToUpdate(names);
              },
            },
            names
          );
          bb[i] = btn;

          //console.log(contacts[i]);
        }
        ReactDOM.render(bb, listContainer);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // show all contacts
  showAll() {
    axios
      .get("http://localhost:9000/adviz/contacts/all/" + currentUser)
      .then((res) => {
        var data = res.data;
        const listContainer = this.ref.current;
        ReactDOM.unmountComponentAtNode(listContainer);

        console.log(data);
        var contacts = [];
        var bb = [];
        this.setState({ contact: [] });
        for (var i = 0; i < data.length; i++) {
          contacts[i] = [
            data[i]._id,
            data[i].Title,
            data[i].gender,
            data[i].Firstname,
            data[i].Surename,
            data[i].Street,
            data[i].postalcode,
            data[i].city,
            data[i].country,
            data[i].email,
            data[i].moreInfos,
            data[i].privateFlag,
            data[i].ownerId,
          ];
          this.setState({ contact: this.state.contact.concat([contacts[i]]) });

          const names = data[i].Firstname + " " + data[i].Surename;
          this.geocode(
            data[i].Street,
            data[i].postalcode,
            data[i].city,
            data[i].country,
            names
          );
          var btn = React.createElement(
            "button",
            {
              style: {
                width: "100%",
                background: "#5C3DFA",
              },
              onClick: () => {
                this.switchToUpdate(names);
              },
            },
            names
          );
          bb[i] = btn;

          //console.log(contacts[i]);
        }
        ReactDOM.render(bb, listContainer);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    currentUser = this.props.currentUser;

    return (
      <div className="main" id="main">
        <h1 id="header">Welcome {this.props.currentUser} </h1>

        <br />
        <br />
        <br />
        <div className="buttons" id="buttons">
          <button id="showall" onClick={this.showAll.bind(this)}>
            Show all contacts
          </button>

          <button id="showmine" onClick={this.showOwn.bind(this)}>
            {" "}
            Show my contacts
          </button>

          <button id="addnew" onClick={this.switchToAdd.bind(this)}>
            Add new contacts
          </button>

          <button id="cancel" onClick={this.logout.bind(this)}>
            Logout
          </button>
          <div id="sidenav" className="sidenav" ref={this.ref}></div>
        </div>
        <div id="map">
          <MapContainer
            center={[52.520008, 13.404954]}
            zoom={13}
            scrollWheelZoom={false}
            className="map"
            id="map"
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />{" "}
            <div>
              {markers.map((marker) => (
                <Marker position={marker.marker} icon={myIcon}>
                  <Popup>{marker.name}</Popup>
                </Marker>
              ))}
            </div>
          </MapContainer>{" "}
        </div>
      </div>
    );
  }
  // switch to "Add new user screen"
  switchToAdd() {
    if (currentUser == "admina") {
      element = (
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            defaultValue={this.state.title}
            onChange={this.onChangeTitle}
          ></input>
          <br />
          <label htmlFor="gender">Gender(m/w/d):</label>
          <select
            defaultValue={this.state.userSelect}
            onChange={this.onChangeUserselect}
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="diverse">Diverse</option>
          </select>
          <br />
          <label htmlFor="htmlForename">Forename:</label>
          <input
            type="text"
            defaultValue={this.state.forename}
            onChange={this.onChangeFirstname}
          ></input>
          <br />
          <label htmlFor="surname">Surname:</label>
          <input
            type="text"
            defaultValue={this.state.surname}
            onChange={this.onChangeSurname}
          ></input>
          <br />
          <label htmlFor="street">Street + House number:</label>

          <input
            type="text"
            defaultValue={this.state.street}
            onChange={this.onChangeStreet}
          ></input>
          <br />
          <label htmlFor="postalcode">ZIP/Postal Code:</label>

          <input
            type="text"
            defaultValue={this.state.postalcode}
            onChange={this.onChangePostalcode}
          ></input>
          <br />
          <label htmlFor="city">City:</label>

          <input
            type="text"
            defaultValue={this.state.city}
            onChange={this.onChangeCity}
          ></input>
          <br />
          <label htmlFor="Country">Country:</label>

          <input
            type="text"
            defaultValue={this.state.country}
            onChange={this.onChangeCountry}
          ></input>
          <br />
          <label htmlFor="email">Email: </label>

          <input
            type="text"
            defaultValue={this.state.email}
            onChange={this.onChangeEmail}
          ></input>
          <br />
          <label htmlFor="furtherInfo">Further InhtmlFormation: </label>

          <input
            type="text"
            defaultValue={this.state.moreInfos}
            onChange={this.onChangeInfos}
          ></input>
          <br />
          <label htmlFor="privateFlag">
            <input
              type="text"
              defaultValue={this.state.privateFlag}
              type="checkbox"
              onChange={this.onChangeCheckbox}
            ></input>
          </label>
          <br />
          <label htmlFor="ownerId" id="ownerIdLabel">
            <select
              defaultValue={this.state.ownerId}
              onChange={this.onChangeOwnerId}
            >
              <option value="admina">Admina</option>
              <option value="normalo">Normalo</option>
            </select>{" "}
          </label>
          <br />
          <button type="submit" className="button" onClick={this.onAdd}>
            Update
          </button>
          <button type="button" className="button" onClick={this.cancle}>
            Cancel
          </button>
        </div>
      );
    } else if (currentUser == "normalo") {
      element = (
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            defaultValue={this.state.title}
            onChange={this.onChangeTitle}
          ></input>
          <br />
          <label htmlFor="gender">Gender(m/w/d):</label>
          <select
            defaultValue={this.state.userSelect}
            onChange={this.onChangeUserselect}
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="diverse">Diverse</option>
          </select>
          <br />
          <label htmlFor="htmlForename">Forename:</label>
          <input
            type="text"
            defaultValue={this.state.forename}
            onChange={this.onChangeFirstname}
          ></input>
          <br />
          <label htmlFor="surname">Surname:</label>
          <input
            type="text"
            defaultValue={this.state.surname}
            onChange={this.onChangeSurname}
          ></input>
          <br />
          <label htmlFor="street">Street + House number:</label>

          <input
            type="text"
            defaultValue={this.state.street}
            onChange={this.onChangeStreet}
          ></input>
          <br />
          <label htmlFor="postalcode">ZIP/Postal Code:</label>

          <input
            type="text"
            defaultValue={this.state.postalcode}
            onChange={this.onChangePostalcode}
          ></input>
          <br />
          <label htmlFor="city">City:</label>

          <input
            type="text"
            defaultValue={this.state.city}
            onChange={this.onChangeCity}
          ></input>
          <br />
          <label htmlFor="Country">Country:</label>

          <input
            type="text"
            defaultValue={this.state.country}
            onChange={this.onChangeCountry}
          ></input>
          <br />
          <label htmlFor="email">Email: </label>

          <input
            type="text"
            defaultValue={this.state.email}
            onChange={this.onChangeEmail}
          ></input>
          <br />
          <label htmlFor="furtherInfo">Further InhtmlFormation: </label>

          <input
            type="text"
            defaultValue={this.state.moreInfos}
            onChange={this.onChangeInfos}
          ></input>
          <br />
          <label htmlFor="privateFlag">
            <input
              type="text"
              defaultValue={this.state.privateFlag}
              type="checkbox"
              onChange={this.onChangeCheckbox}
            ></input>
          </label>

          <br />
          <button type="submit" className="button" onClick={this.onAdd}>
            Update
          </button>
          <button type="button" className="button" onClick={this.cancle}>
            Cancel
          </button>
        </div>
      );
    }

    form = document.getElementById("addForm");
    ReactDOM.render(element, form);

    switchScreens("add", "main");
  }
  // switch to "Update user" screen
  switchToUpdate(names) {
    console.log(names);
    this.setState({ popup: names });
    console.log(this.state.contact);
    for (var i of this.state.contact) {
      if (i[3] + " " + i[4] == names) {
        id = "";
        title = "";
        firstname = "";
        surname = "";
        street = "";
        postalcode = "";
        city = "";
        country = "";
        email = "";
        moreInfos = "";
        selected = "";
        ownerId = "";
        checked = false;
        element = "";
        console.log(i);
        id = i[0];
        title = i[1];
        if (i[2] == "w") {
          selected = "female";
        } else if (i[2] == "m") {
          selected = "male";
        } else {
          selected = "diverse";
        }
        firstname = i[3];
        surname = i[4];
        street = i[5];
        postalcode = i[6];
        city = i[7];
        country = i[8];
        email = i[9];
        moreInfos = i[10];

        if (i[11] == "private") {
          checked = true;
        } else if (i[11] == "public") {
          checked = false;
        }

        if (i[12] == "admina") {
          ownerId = "admina";
        } else if (i[12] == "normalo") {
          ownerId = "normalo";
        } else {
          ownerId = "none";
        }
        console.log(this.state.currentUser);
        if (currentUser == "admina") {
          element = (
            <div>
              <label>{id}</label>
              <br />
              <input
                type="text"
                defaultValue={title}
                onChange={this.onChangeTitle}
              ></input>
              <br />
              <select defaultValue={i[2]} onChange={this.onChangeUserselect}>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="diverse">Diverse</option>
              </select>
              <br />
              <input
                type="text"
                defaultValue={firstname}
                onChange={this.onChangeFirstname}
              ></input>
              <br />
              <input
                type="text"
                defaultValue={surname}
                onChange={this.onChangeSurname}
              ></input>
              <br />
              <input
                type="text"
                defaultValue={street}
                onChange={this.onChangeStreet}
              ></input>
              <br />
              <input
                type="text"
                defaultValue={postalcode}
                onChange={this.onChangePostalcode}
              ></input>
              <br />
              <input
                type="text"
                defaultValue={city}
                onChange={this.onChangeCity}
              ></input>
              <br />
              <input
                type="text"
                defaultValue={country}
                onChange={this.onChangeCountry}
              ></input>
              <br />
              <input
                type="text"
                defaultValue={email}
                onChange={this.onChangeEmail}
              ></input>
              <br />
              <input
                type="text"
                defaultValue={moreInfos}
                onChange={this.onChangeInfos}
              ></input>
              <br />
              <input
                defaultValue={checked}
                type="checkbox"
                onChange={this.onChangeCheckbox}
              ></input>
              <br />
              <select defaultValue={ownerId} onChange={this.onChangeOwnerId}>
                <option value="admina">Admina</option>
                <option value="normalo">Normalo</option>
              </select>{" "}
              <br />
              <button type="submit" className="button" onClick={this.onSubmit}>
                Update
              </button>
              <button type="submit" className="button" onClick={this.onDelete}>
                Delete
              </button>
              <button type="button" className="button" onClick={this.cancle}>
                Cancel
              </button>
            </div>
          );
        } else if (currentUser == "normalo") {
          if (ownerId == "admina") {
            element = (
              <div>
                <label>{title}</label>
                <br />
                <label>{selected}</label>
                <br />
                <label>{firstname}</label>
                <br />
                <label>{surname}</label>
                <br />
                <label>{street}</label>
                <br />
                <label>{postalcode}</label>
                <br />
                <label>{city}</label>
                <br />
                <label>{country}</label>
                <br />
                <label>{email}</label>
                <br />
                <label>{moreInfos}</label>
                <br />

                <button type="button" className="button" onClick={this.cancle}>
                  Cancel
                </button>
              </div>
            );
          } else if (ownerId == "normalo") {
            element = (
              <div>
                <label>{id}</label>
                <br />
                <input
                  type="text"
                  defaultValue={title}
                  onChange={this.onChangeTitle}
                ></input>
                <br />
                <select defaultValue={i[2]} onChange={this.onChangeUserselect}>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="diverse">Diverse</option>
                </select>
                <br />
                <input
                  type="text"
                  defaultValue={firstname}
                  onChange={this.onChangeFirstname}
                ></input>
                <br />
                <input
                  type="text"
                  defaultValue={surname}
                  onChange={this.onChangeSurname}
                ></input>
                <br />
                <input
                  type="text"
                  defaultValue={street}
                  onChange={this.onChangeStreet}
                ></input>
                <br />
                <input
                  type="text"
                  defaultValue={postalcode}
                  onChange={this.onChangePostalcode}
                ></input>
                <br />
                <input
                  type="text"
                  defaultValue={city}
                  onChange={this.onChangeCity}
                ></input>
                <br />
                <input
                  type="text"
                  defaultValue={country}
                  onChange={this.onChangeCountry}
                ></input>
                <br />
                <input
                  type="text"
                  defaultValue={email}
                  onChange={this.onChangeEmail}
                ></input>
                <br />
                <input
                  type="text"
                  defaultValue={moreInfos}
                  onChange={this.onChangeInfos}
                ></input>
                <br />
                <input
                  defaultValue={checked}
                  type="checkbox"
                  onChange={this.onChangeCheckbox}
                ></input>
                <br />

                <button
                  type="submit"
                  className="button"
                  onClick={this.onSubmit}
                >
                  Update
                </button>
                <button
                  type="submit"
                  className="button"
                  onClick={this.onDelete}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="button"
                  onClick={this.cancleUpdate}
                >
                  Cancel
                </button>
              </div>
            );
          }
        }

        form = document.getElementById("updateForm");
        ReactDOM.render(element, form);
        switchScreens("update", "main");
      }
    }
  }

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
    title = e.target.value;
    console.log(title);
  }
  onChangeFirstname(e) {
    this.setState({ forename: e.target.value });

    firstname = e.target.value;
    console.log(firstname);
  }
  onChangeSurname(e) {
    this.setState({ surname: e.target.value });

    surname = e.target.value;
    console.log(surname);
  }
  onChangeStreet(e) {
    this.setState({ street: e.target.value });

    street = e.target.value;
    console.log(street);
  }
  onChangePostalcode(e) {
    this.setState({ postalcode: e.target.value });

    postalcode = e.target.value;
    console.log(postalcode);
  }
  onChangeCity(e) {
    this.setState({ city: e.target.value });

    city = e.target.value;
    console.log(city);
  }
  onChangeCountry(e) {
    this.setState({ country: e.target.value });

    country = e.target.value;
    console.log(country);
  }
  onChangeEmail(e) {
    this.setState({ email: e.target.value });

    email = e.target.value;
    console.log(email);
  }
  onChangeInfos(e) {
    this.setState({ moreInfos: e.target.value });

    moreInfos = e.target.value;
    console.log(moreInfos);
  }
  onChangeUserselect(e) {
    var target = e.target.value;
    console.log(target);
    if (target == "female") {
      this.setState({ userSelect: "female" });
    } else if (target == "male") {
      this.setState({ userSelect: "male" });
    } else {
      this.setState({ userSelect: "diverse" });
    }
    selected = e.target.value;
    console.log(selected);
  }
  onChangeCheckbox(e) {
    this.setState({
      privateFlag: !this.state.privateFlag,
    });
    checked = e.target.checked;
    console.log(checked);
  }
  onChangeOwnerId(e) {
    var target = e.target.value;
    console.log(target);

    if (target == "admina") {
      this.setState({ ownerId: "admina" });
    } else if (target == "normalo") {
      this.setState({ ownerId: "normalo" });
    } else {
      this.setState({ ownerId: "none" });
    }
    ownerId = e.target.value;
    console.log(ownerId);
  }
}

export default Main;
