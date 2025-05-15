import React, {useEffect, useState} from 'react';

const LinkForm: React.FC = () => {
    const [linkInput, setLinkInput] = useState(''); // Hold URL
    const [tagInput, setTagInput]= useState(''); // holds Tags
    const [tags,setTags] = useState<string[]>([]) // array of tags
    const [bookmarks,setBookmarks] = useState<
    { url: string; tags:string[]} [] 
    >([]);

    useEffect(()=>{
        const storedBookmarks = localStorage.getItem('bookmarks');
        if(storedBookmarks){
            setBookmarks(JSON.parse(storedBookmarks));
        }
    },[]);

    useEffect(()=>{
        console.log("Bookmarks updated:",bookmarks)
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    },[bookmarks]);
    

    const isValidUrl = (url: string) =>{
        return /^https?:\/\/\S+\.\S+/.test(url);
    };

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) =>{ // assigning the event (e) to specific keyboard and input event for precision and surity
        if((e.key === 'Enter' || e.key === ',') && tagInput.trim()!==''){
            e.preventDefault();
            const newTag = tagInput.trim().toLowerCase();

            if(!tags.includes(newTag)){ // this checks the entered Tag doesn't matches with the existing one
                setTags([...tags,newTag]); // if not matches then it creats new array with existing values and add the newTag at the last.
            }
            setTagInput(''); // after all the process it clears theinput field
        }
    };

    const removeTag = (tagToRemove: string) =>{
        setTags(tags.filter(tag =>tag !== tagToRemove)) // iterate through the tag array and returns the array who matches the tagToRemove. and make another array of rest of the tags that doesn't matches the tagToRemove.
    };

    const handleSave=()=>{

        if(!isValidUrl(linkInput)){
            alert('Please enter a valid URL');
            return;
        }
        const newBookmark ={
            url : linkInput,
            tags: tags,
        };

        console.log("Saving new Bookmark:",newBookmark)

        setBookmarks([...bookmarks,newBookmark]);
        setLinkInput("");
        setTags([]);
    };

    return(
        <div style={{maxWidth:500, margin: '0 auto', padding:20}}>
            {/* URL inputs */}
            <input type="text"
            placeholder="paste you link here..."
            value={linkInput} 
            onChange={(e) => setLinkInput(e.target.value)}
            style={{width: '100%',  padding:10,marginBottom:10}}
            />

            {/*Tag Input*/} 
            <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:10}}>
                {tags.map((tag)=>(
                    <div key={tag} style={{ background:'#eee',padding:'5px 10px', borderRadius: '20px'}}>
                        {tag}
                        <span
                        style={{marginLeft: 8, cursor: 'pointer', color:'red'}} 
                        onClick={()=> removeTag(tag)}>
                            x
                        </span>
                    </div>
                ))}
            </div>
            <input type="text"
            placeholder="Add tags(press Enter or ,)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            style={{ width: '100%', padding:10 , marginBottom:10}}
            />
            {/* + Add Button */}
            <button onClick={handleSave} style={{padding:10,width:'100%'}}>
                + Add
            </button>

            {/*Display the Bookmarks*/}
            <div style={{marginTop:30}}>
                <h3>Saved Links</h3>
                {bookmarks.length ===0?(
                    <p>No links saved yet</p>
                ):(
                    bookmarks.map((bookmark,index)=>(
                        <div key={index}>
                            <a href={bookmark.url} target="_blank" rel='noopener noreferrer' style={{fontWeight:'bold'}}>
                                {bookmark.url}
                            </a>
                            <div style={{display:'flex', flexWrap:'wrap',gap:8,marginTop:5}}>
                                {bookmark.tags.map((tag,idx)=>(
                                    <span key={idx} style={{background:'#eee',padding:'3px 8px',borderRadius:'12px',fontSize:'0.85rem'}}>
                                        {tag}
                                    </span>
                                ))}

                            </div>

                        </div>
                    ))
                )}
            </div>
        </div>        
    );
};

export default LinkForm;
