import React from "react"
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import H5 from "@material-tailwind/react/Heading5";
import parse, { attributesToProps } from 'html-react-parser';
export default function PreviewHtml(props) {
    const { title, content } = props

    const options = {
        replace: domNode => {
            if (domNode.attribs && domNode.name === 'iframe') {
                const props = attributesToProps(domNode.attribs);
                console.log(props)
                return <div style={{ display: "flex", justifyContent: "center" }}><iframe width="800px" title="iframe" {...props} /> </div>
            }
        }
    };

    return (
        <>
            <Card  title={title} bordered={false}>
            {title && 
            <CardHeader color="lightBlue" size="md">
                <H5 color="white">{title}</H5>
            </CardHeader>
            }
                <CardBody>
                {
                   content && parse(content, options)
                }

                </CardBody>
            </Card>

        </>

    )
}