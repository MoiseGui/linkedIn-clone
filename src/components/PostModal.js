import styled from 'styled-components';
import { useState } from 'react';
import { connect } from 'react-redux'

export const PostModal = ({ showModal, handleShowModalClick }) => {
    const [editorText, setEditorText] = useState('');

    const reset = e => {
        setEditorText('');
        handleShowModalClick(e);
    }

    return (
        <>
            {showModal == "open" &&
                <Container>
                    <Content>
                        <Header>
                            <h2>Create a post</h2>
                            <button onClick={e => reset(e)}><img src="/images/close-icon.svg" alt="" /></button>
                        </Header>
                        <SharedContent>
                            <UserInfo>
                                <img src="/images/user.svg" alt="" />
                                <span>Name</span>
                            </UserInfo>
                            <Editor>
                                <textarea
                                    value={editorText}
                                    onChange={(e) => setEditorText(e.target.value)}
                                    placeholder="What do you want to talk about?"
                                    autoFocus={true}
                                ></textarea>
                            </Editor>
                        </SharedContent>
                        <ShareCreation>
                            <AttachAssets>
                                <AssetButton>
                                    <img src="/images/share-image.svg" alt="" />
                                </AssetButton>
                                <AssetButton>
                                    <img src="/images/share-video.svg" alt="" />
                                </AssetButton>
                            </AttachAssets>
                            <ShareComment>
                                <AssetButton>
                                    <img src="/images/share-comment.svg" alt="" />
                                    <span>Anyone</span>
                                </AssetButton>
                            </ShareComment>

                            <PostButton>Post</PostButton>
                        </ShareCreation>
                    </Content>
                </Container>
            }
        </>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(PostModal)

const Container = styled.div`
    Position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    color: black;
    background-color: rgba(0, 0, 0, 0.8);
`;

const Content = styled.div`
    width: 100%;
    max-width: 512px;
    background-color: white;
    max-height: 90%;
    overflow-y: initial;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    top: 32px;
    margin: 0 auto;
`;

const Header = styled.div`
    /* display: block; */
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
        height: 40px;
        width: 40px;
        min-width: auto;
        color: rgba(0, 0, 0, 0.15);
        background-color: transparent;
        border: none;
        cursor: pointer;
        img, svg {
            filter: invert(41%) sepia(0%) saturate(0%) hue-rotate(192deg) brightness(95%) contrast(90%);
            pointer-events: none;
        }
    }
`;

const SharedContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    vertical-align: baseline;
    background-color: transparent;
    padding: 8px 12px;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 24px;
    svg, img {
        width: 48px;
        height: 48px;
        background-clip: content-box;
        border: 2px solid transparent;
        border-radius: 50%;
    }
    span {
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-left: 5px;
    }
`;

const ShareCreation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
    display: flex;
    align-items: center;
    height: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.5);
    border: none;
    background-color: transparent;
    cursor: pointer;
    span {
        margin-left: 5px;
    }
    img {
        filter: invert(53%) sepia(17%) saturate(25%) hue-rotate(341deg) brightness(91%) contrast(92%);
    }
`;

const AttachAssets = styled.div`
    display: flex;
    align-items: center;
    padding-right: 8px;
    ${AssetButton} {
        width: 40px;
    }
`;

const ShareComment = styled.div`
    padding-left: 8px;
    margin-right: auto;
    border-left: 1px solid rgba(0, 0, 0, 0.15);
    ${AssetButton} {
        img {
            filter: invert(53%) sepia(17%) saturate(25%) hue-rotate(341deg) brightness(91%) contrast(92%);
        }
        svg {
            margin-right: 5px;
        }
    }
`;

const PostButton = styled.button`
    min-width: 60px;
    border-radius: 20px;
    padding-left: 16px;
    padding-right: 16px;
    background-color: #0a66c2;
    border: none;
    color: white;
    cursor: pointer;
    &:hover {
        background-color: #004182;
    }
`;

const Editor = styled.div`
    padding: 12px 24px;
    textarea {
        width: 100%;
        min-height: 100px;
        resize: none;
        border: none;
        outline: none;
    }
    input {
        width: 100%;
        height: 35px;
        font-size: 16px;
        margin-bottom: 20px;
    }
`;