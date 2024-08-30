import { Component, createRef } from 'react';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { formHTML } from '../sources/Form';
import { DEFAULT_USER_AGENT, DEFAULT_URL } from '../helpers';

export default class FileSelect extends Component {
    constructor(props) {
        super(props);
        this.webPaymentRef = createRef(null);
    }

    getContent() {
        let loadContent = null;
        const file_types = typeof this.props.file_types != "undefined" ? this.props.file_types : "";
        const file_text = typeof this.props.file_text != "undefined" ? this.props.file_text : "Open";
        const style_button = typeof this.props.style_button != "undefined" ? this.props.style_button : "";
        if (typeof this.props.useRemote != "undefined" && this.props.useRemote == true) {
            loadContent = { uri: DEFAULT_URL + '?file_types=' + file_types + '&file_text=' + file_text + '&style_button=' + style_button };
        } else {
            loadContent = { html: formHTML(file_types, file_text, style_button) };
        }
        return loadContent;
    }

    render() {
        const content = this.getContent();
        return (
            <WebView
                ref={this.webPaymentRef}
                scalesPageToFit={true}
                overScrollMode={"never"}
                nestedScrollEnabled={true}
                automaticallyAdjustContentInsets={true}
                javaScriptEnabled={true}
                originWhitelist={['*']}
                mixedContentMode="compatibility"
                {...this.props}
                source={content}
                userAgent={
                    typeof this.props.forceAndroidAutoplay != "undefined"
                        ? Platform.select({ android: DEFAULT_USER_AGENT, ios: '' })
                        : ''
                }
                onShouldStartLoadWithRequest={event => { return true; }}
                onMessage={(event) => {
                    if (
                        typeof event.nativeEvent.data == "string" &&
                        typeof JSON.parse(event.nativeEvent.data) == "object"
                    ) {
                        const datas = JSON.parse(event.nativeEvent.data);
                        if (typeof this.props.getFile != "undefined") {
                            if (typeof datas.isFile != "undefined") {
                                this.props.getFile(datas);
                                return;
                            }
                        }
                    }
                    if (typeof this.props.onMessage != "undefined") {
                        this.props.onMessage(event.nativeEvent.data);
                    }
                }}
            />
        );
    }
};