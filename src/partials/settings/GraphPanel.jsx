import React, { useState } from 'react';

import { ReactDiagram, ReactOverview, ReactPalette } from "gojs-react";
import * as go from 'gojs';


function GraphPanel() {

    const [topicName, setTopicName] = useState('');
    const [numPartitions, setNumPartitions] = useState(1);
    const [replicationFactor, setReplicationFactor] = useState(1);
    
    function handleCreate() {
      // Create topic logic here...
      createKafkaTopic(topicName, numPartitions, replicationFactor);
    }

    const styles = `
    .diagram-component {
        width: 100%;
        height: 90vmin;
        border: solid 0 black;
        background-color: white !important;        
      }
  `;

    function initDiagram() {
        const $ = go.GraphObject.make;
        // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
      
        const simpletemplate =
        $(go.Node, 'Auto', {  isShadowed: true,
            shadowColor: "#e1e1dfa8" ,shadowBlur:15},
         // the Shape will go around the TextBlock
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'Rectangle',
          { name: 'SHAPE', fill: 'white', strokeWidth: 0 },
          // Shape.fill is bound to Node.data.color
          new go.Binding('fill', 'color')),
                {
                selectionAdornmentTemplate:
                  $(go.Adornment, "Spot",
                    $(go.Panel, "Auto",
                      // this Adornment has a rectangular blue Shape around the selected node
                      $(go.Shape, { fill: null, stroke: "#31a3ed", strokeWidth: 3 }),
                      $(go.Placeholder)
                    ),                  
                  )  // end Adornment
              },
        $(go.TextBlock,
          { margin: 28, editable: true , font: '10pt  "Segoe UI"'},  // some room around the text
          new go.Binding('text').makeTwoWay()
        ),
        );
      
        const detailtemplate =
         $(go.Node, "Auto", {  isShadowed: true,
            shadowColor: "#e1e1dfa8"  ,shadowBlur:15},    
        $(go.Shape, "Rectangle",        
            { name: 'SHAPE',width: 200, fill: 'white', strokeWidth: 0 },
          new go.Binding("fill", "color")),
          {
            selectionAdornmentTemplate:
              $(go.Adornment, "Spot",
                $(go.Panel, "Auto",
                  // this Adornment has a rectangular blue Shape around the selected node
                  $(go.Shape, { fill: null, stroke: "#31a3ed", strokeWidth: 3 }),                  
                  $(go.Placeholder)
                ),                  
              )  // end Adornment
          }, 
        $(go.Panel, "Table",
          { defaultAlignment: go.Spot.Left },
          $(go.TextBlock, {  margin: 12, row: 0, column: 0, columnSpan: 2,   font: 'bold 11pt  "Segoe UI"',stroke: "white"  },
            new go.Binding("text", "text")),     
          $(go.TextBlock, {  row: 1, column: 0 ,  font: '10pt  "Segoe UI"',stroke: "white" }, "source:"),
          $(go.TextBlock, { row: 1, column: 1 , font: '10pt  "Segoe UI"',stroke: "white" }, new go.Binding("text", "source")),
          $(go.TextBlock, {row: 2, column: 0 ,height: 30, font: '10pt  "Segoe UI"',stroke: "white" }, "score:"),
          $(go.TextBlock, { height: 30,row: 2, column: 1, font: '10pt  "Segoe UI"',stroke: "white" }, new go.Binding("text", "score"))
        )
      );
      
      const linkTemplate =
      $(go.Link,
        // { curve: go.Link.Bezier },
        $(go.Shape, { stroke: "#aaa" ,strokeWidth: 2 }),
        $(go.Shape, { toArrow: "OpenTriangle" }),
        {
          selectionAdornmentTemplate:
            $(go.Adornment,
              $(go.Shape,
                { isPanelMain: true, stroke: "#999", strokeWidth: 3 }),
            )  // end Adornment
        },
        // $(go.TextBlock, "label", { segmentOffset: new go.Point(0, -10) }),
      );

      const listtemplate =
      $(go.Node, "Auto",     
      $(go.Shape, "Rectangle",
         { name: 'SHAPE',width: 200, fill: 'white', strokeWidth: 0 },
       new go.Binding("fill", "color")),
            $(go.Panel, "Vertical",
            new go.Binding("itemArray", "items"),
            {
              itemTemplate:
              $(go.Panel, "Table",
              { defaultAlignment: go.Spot.Left },
              $(go.TextBlock, {  margin: 2, row: 0, column: 2, columnSpan: 2, font: "bold 12pt sans-serif" },
                new go.Binding("text", "text")),
              $(go.TextBlock, {  row: 1, column: 0 , stroke: "#777" }, "TID:"),
              $(go.TextBlock, { row: 1, column: 1 , stroke: "#777"}, new go.Binding("text", "")),
            )
            })
          );
      
        const diagram =
        $(go.Diagram,
            {
                grid: $(go.Panel, "Grid",
                $(go.Shape, "LineH", { stroke: "lightgray", strokeWidth: 0.5 }),
                // $(go.Shape, "LineH", { stroke: "gray", strokeWidth: 0.5, interval: 10 }),
                $(go.Shape, "LineV", { stroke: "lightgray", strokeWidth: 0.5 }),
                // $(go.Shape, "LineV", { stroke: "gray", strokeWidth: 0.5, interval: 10 })
              ),
              allowDrop: true,  // must be true to accept drops from the Palette
              "draggingTool.dragsLink": true,
              "draggingTool.isGridSnapEnabled": true,
              "linkingTool.isUnconnectedLinkValid": true,
              "linkingTool.portGravity": 30,
              "relinkingTool.isUnconnectedLinkValid": true,
              "relinkingTool.portGravity": 30,
              "relinkingTool.fromHandleArchetype":
                $(go.Shape, "Diamond", { segmentIndex: 0, cursor: "pointer", desiredSize: new go.Size(8, 8), fill: "tomato", stroke: "darkred" }),
              "relinkingTool.toHandleArchetype":
                $(go.Shape, "Diamond", { segmentIndex: -1, cursor: "pointer", desiredSize: new go.Size(8, 8), fill: "darkred", stroke: "tomato" }),
              "linkReshapingTool.handleArchetype":
                $(go.Shape, "Diamond", { desiredSize: new go.Size(7, 7), fill: "lightblue", stroke: "deepskyblue" }),
              "rotatingTool.snapAngleMultiple": 15,
              "rotatingTool.snapAngleEpsilon": 15,              
            'undoManager.isEnabled': true,  // must be set to allow for model change listening
            // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
            'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
            model: new go.GraphLinksModel(
                {
                linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
                })
            });
      
        // create the nodeTemplateMap, holding three node templates:
        const templmap = new go.Map(); // In TypeScript you could write: new go.Map<string, go.Node>();
        // for each of the node categories, specify which template to use
        templmap.add("simple", simpletemplate);
        templmap.add("detailed", detailtemplate);
        templmap.add("list", listtemplate);        
      
      
        // for the default category, "", use the same template that Diagrams use by default;
        // this just shows the key value as a simple TextBlock
        //templmap.add("", diagram.nodeTemplate);
      
        diagram.linkTemplate  = linkTemplate;
        diagram.nodeTemplateMap = templmap;
        diagram.layout = $(go.TreeLayout);
      
      
        return diagram;
      }

    return (
          <div className='grow'>
                  <div className="p-6 space-y-6">
                    <h2 className="text-2xl text-slate-800 font-bold mb-5">Create Topic Setting</h2>

                    <ReactDiagram
                        initDiagram={initDiagram}
                        divClassName='diagram-component'
                        style={{ backgroundColor: '#eee' }}
                        nodeDataArray={[
                            // { key: "Alpha", desc: "first letter", color: 'green' ,category: "simple"  },  // uses default category: ""
                            { key: 'c0', text: 'CASEID-1254', color: '#0D99FF' , score : '10', category: "detailed" },
                            { key: 1, text: 'CARD-8825664771', color: '#FFE8A3' , category: "simple"},
                            { key: 2, text: 'CARD-1233457889', color: '#FFE8A3' , category: "simple"},
                            { key: 3, text: 'CARD-1625441554', color: '#FFE8A3' , category: "simple"},
                            { key: 4, text: 'CARD-5211402144', color: '#FFE8A3' , category: "simple"},

                            { key: 5, text: 'TR-12345574', color: '#FCD19C' , category: "simple"},
                            { key: 6, text: 'TR-14456687', color: '#FCD19C' , category: "simple"},
                            { key: 7, text: 'TR-14556667', color: '#FCD19C' , category: "simple"},

                            { key: 8, items: [ "TR-12345574", "TR-14456687", "TR-14556667" ] , color: '#eee'  , category: "list"}
                        ]}       
                        linkDataArray={[
                            { key: -1, from: 'c0', to: 1 },
                            { key: -2, from: 'c0', to: 2 },
                            { key: -3, from: 'c0', to: 3 },
                            { key: -4, from: 'c0', to: 4 },            

                            { key: -5, from: 1, to: 5},
                            { key: -6, from: 1, to: 6 },
                            { key: -7, from: 1, to: 7 },
                        ]} 
                    />

                    {/* Panel footer */}
                    <footer>
                        <div className="flex flex-col px-6 py-5 border-t border-slate-200">
                        <div className="flex self-end">
                            <button className="btn border-slate-200 hover:border-slate-300 text-slate-600">Cancel</button>
                            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">Create Topic</button>
                        </div>
                        </div>
                    </footer>
                    <style>{styles}</style>

                </div>
          </div>
    )
}

export default GraphPanel;