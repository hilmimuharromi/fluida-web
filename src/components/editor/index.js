import React, { useState, useEffect } from "react"
import { EditorState, } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
// import Iframe from "./Iframe"
import { FromHtml, ToHtml } from "utils/draftConvert"
// import axios from "axios"
function EditorContainer(props) {
    const { data, setData, editorStyle, isReset, resetEditor  } = props
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const editorStyleDefault = {
        height: '500px' || "500px", overflow: "auto"

    }

    useEffect(() => {
        if (data) {
            console.log('masuk content')
            setEditorState(FromHtml(data))
        }
        
        // return () => {
        //     setEditorState(EditorState.createEmpty())
        // }
    }, [data])

    useEffect(() => {
        if (!data) {
            setEditorState(EditorState.createEmpty())
        }
    }, [data])

    useEffect(() => {
        if (isReset) {
            setEditorState(EditorState.createEmpty())
            resetEditor(false)
        }
         //eslint-disable-next-line
    }, [isReset])

    function uploadImageCallBack(file) {
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                // xhr.open('POST', 'https://api.imgur.com/3/image');
                xhr.open('POST', 'https://api.imgbb.com/1/upload?key=68f0a2cb8234add30ae895949f18c671');
                // xhr.setRequestHeader('Authorization', 'Client-ID 1ec9ba58f65058a');
                const data = new FormData();
                data.append('image', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    console.log(response)
                    resolve(response);
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    console.log(error)
                    reject(error);
                });
            }
        );
    }

    function handleEmbed(str) {
        if (str.startsWith("<iframe")) {
            const start = str.search("src=")
            const end = str.indexOf(`"`, start + 5)
            return str.substring(start + 5, end);
        } else return str
    }
    return (
        <>
            <div className='editor' style={{ marginTop: "10px", marginBottom: "10px" }}>
                <Editor
                    wrapperClassName="demo-wrapper"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    toolbarStyle={{ width: "100%" }}
                    editorStyle={editorStyle ? editorStyle : editorStyleDefault}
                    wrapperStyle={{ borderStyle: "inset" }}
                    editorState={editorState}
                    onEditorStateChange={(value) => {
                        setEditorState(value)
                        setData(ToHtml(editorState))
                    }}
                    toolbar={{
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                        embedded: {
                            embedCallback: handleEmbed,
                            defaultSize: {
                                height: '500px',
                                width: '800px',
                            }
                        },
                        image: { 
                            uploadCallback: uploadImageCallBack, 
                            alt: { present: true, mandatory: false }, 
                            previewImage: true,
                         },
                    }}
                // toolbarCustomButtons={[<Iframe />]}
                />
            </div>
        </>

    )
}

export default EditorContainer