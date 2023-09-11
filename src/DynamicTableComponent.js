import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import convert from 'xml-js';

class DynamicTableComponent extends Component {
    constructor(props) {
        //console.log(props.onClick);
        super(props);
        this.onClick = props.onClick;
        this.onTableReady = props.onTableReady;
        this.state = {
            dataPoints: this.props.dataPoints || [],
            url: this.props.url || "",
            clickthroughurl : "",
            adomain : ""
        }
    }


    componentDidMount() {
        // Make the first request and then start polling.
        //console.log("componentDidMount")
        this.onTableReady(this);
        this.requestLatest();
        //this.props.requestLatest = this.requestLatest;
        //this.props.requestLatest();
    }

    getVastDetails(vastStr){

        var vastJSON = JSON.parse(convert.xml2json(vastStr,{compact: true, spaces: 4}));
        if (vastJSON  && vastJSON.VAST && vastJSON.VAST.Ad && vastJSON.VAST.Ad.Wrapper && vastJSON.VAST.Ad.Wrapper.VASTAdTagURI) {
            this.requestLatest(vastJSON.VAST.Ad.Wrapper.VASTAdTagURI._cdata);
            return [];
        }
        const itemArr = [];
        if(vastJSON  && vastJSON.VAST && vastJSON.VAST.Ad && vastJSON.VAST.Ad.InLine) {
            const duration = vastJSON.VAST.Ad.InLine.Creatives.Creative.Linear.Duration._text;
            const id = vastJSON.VAST.Ad.InLine.Creatives.Creative._attributes.id;
            if(vastJSON.VAST.Ad.InLine.Creatives.Creative.Linear.VideoClicks && vastJSON.VAST.Ad.InLine.Creatives.Creative.Linear.VideoClicks.ClickThrough){
                this.setState({
                        clickthroughurl: vastJSON.VAST.Ad.InLine.Creatives.Creative.Linear.VideoClicks.ClickThrough._cdata
                    }); 
            }
            
            vastJSON.VAST.Ad.InLine.Creatives.Creative.Linear.MediaFiles.MediaFile.forEach(
                item=>itemArr.push({
                    "url":item._cdata,
                    "height":item._attributes.height,
                    "width":item._attributes.width,
                    "bitrate":item._attributes.bitrate,
                    "type":item._attributes.type,
                    "framerate":(item._cdata.match(/([0-9.]*fps)/) ? item._cdata.match(/([0-9.]*fps)/)[1]:""),
                    "duration":duration,
                    "creativeId":id
                })
            );    
        }
        return itemArr;
    }


    requestLatest = (url) => {
        console.log("URL TO FETCH VAST: ", url)
        fetch(url ? url : "https://aax-us-east.amazon-adsystem.com/e/mdtb/vast?b=JJ1Yx9yxe2Bx2lSJfbMNYMEAAAGKfOam3QEAAA_ABgBhcHNfbHR0bF9iaWQxICBhcHNfdHhuX2ltcDEgICC1z30n&inv=oybxfk")
            .then(response => response.text())
            .then(dataPoint => {
                //console.log(dataPoint);
                //console.log(convert.xml2json(dataPoint,{compact: true, spaces: 4}));
                /*const vastJSON = JSON.parse(convert.xml2json(dataPoint,{compact: true, spaces: 4}));
                //console.log(vastJSON.VAST.Ad.InLine.Creatives.Creative.Linear.MediaFiles.MediaFile[0]._cdata)
                const itemArr = [];
                const duration = vastJSON.VAST.Ad.InLine.Creatives.Creative.Linear.Duration._text;
                const id = vastJSON.VAST.Ad.InLine.Creatives.Creative._attributes.id;
                vastJSON.VAST.Ad.InLine.Creatives.Creative.Linear.MediaFiles.MediaFile.forEach(
                    item=>itemArr.push({
                        "url":item._cdata,
                        "height":item._attributes.height,
                        "width":item._attributes.width,
                        "bitrate":item._attributes.bitrate,
                        "type":item._attributes.type,
                        "framerate":(item._cdata.match(/-([^-]*fps)/) ? item._cdata.match(/-([^-]*fps)/)[1]:""),
                        "duration":duration,
                        "creativeId":id
                    })
                );*/
                var itemArr = this.getVastDetails(dataPoint);
                //Object.keys(dataPoint).forEach(item=>itemArr.push(dataPoint[item]));
                if (itemArr.length) {
                    this.setState({
                        dataPoints: itemArr
                    });
                    console.log(itemArr);
                    this.props.onClick(itemArr[0].url);
                }
            }
            );
    }

    render() {
        
        let  clickthroughurl  = this.state.clickthroughurl;
        //const t={this.state.clickthroughurl};
        return (
        <div>
        <div><h3>clickthroughurl</h3></div>
        <div>{this.state.clickthroughurl}</div>
        <div><h3>Renditions</h3>
       <div style={{'paddingLeft':'50px', 'paddingRight':'50px', height:'500px', overflow:'auto'}}> 
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Duration</th>
              <th>Creative ID</th>
              <th>Height</th>
              <th>Width</th>
              <th>Bitrate</th>
              <th>Framerate</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {this.state.dataPoints.map((listitem, index) => (
                <tr onClick={()=>this.onClick(listitem.url)}>
                    <td>{index+1}</td>
                    <td>{listitem.duration}</td>
                    <td>{listitem.creativeId}</td>
                    <td>{listitem.height}</td>
                    <td>{listitem.width}</td>
                    <td>{listitem.bitrate}</td>
                    <td>{listitem.framerate}</td>
                    <td>{listitem.url}</td>
                </tr>
            ))}
          </tbody>
        </Table>
        </div>
        </div>
        </div>
        )
    }

    
}

export default DynamicTableComponent;