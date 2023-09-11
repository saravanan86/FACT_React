import React, { Component } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import convert from 'xml-js';

class DynamicListComponent extends Component {
    constructor(props) {
        //console.log(props.onClick);
        super(props);
        this.onClick = props.onClick;
        this.state = {
            dataPoints: this.props.dataPoints || [] // Set the initial state
        }
    }


    componentDidMount() {
        // Make the first request and then start polling.
        console.log("componentDidMount")
        this.requestLatest();
    }


    requestLatest = () => {
        fetch("https://aax-us-east.amazon-adsystem.com/e/mdtb/vast?b=JJlxKrqzDjJrtV7tDERtxtwAAAGHJh_BAQEAAA_ABgBOL0EgICAgICAgICAgICBhcHNfdHhuX2ltcDEgICADVa4J")
            .then(response => response.text())
            .then(dataPoint => {
                //console.log(dataPoint);
                //console.log(convert.xml2json(dataPoint,{compact: true, spaces: 4}));
                const vastJSON = JSON.parse(convert.xml2json(dataPoint,{compact: true, spaces: 4}));
                //console.log(vastJSON.VAST.Ad.InLine.Creatives.Creative.Linear.MediaFiles.MediaFile[0]._cdata)
                const itemArr = [];
                vastJSON.VAST.Ad.InLine.Creatives.Creative.Linear.MediaFiles.MediaFile.forEach(
                    item=>itemArr.push(item._cdata)
                    );
                //Object.keys(dataPoint).forEach(item=>itemArr.push(dataPoint[item]));
                this.setState({
                    dataPoints: itemArr
                })
            }
            );
    }

    render() {
        return (
        <ListGroup>
            {this.state.dataPoints.map(listitem => (
                <ListGroup.Item onClick={()=>this.onClick(listitem)}>{listitem}</ListGroup.Item>
            ))}
        </ListGroup>
        )
    }

    
}

export default DynamicListComponent;