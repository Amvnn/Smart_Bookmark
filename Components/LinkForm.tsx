import React, {useState} from 'react';

const LinkForm: React.FC = () => {
    const [linkInput, setLinkInput] = useState(''); // Hold URL
    const [tagInput, setTagInput]= useState(''); // holds Tags
    const [tags,setTags] = useState<string[]>([]) // array of tags

    const isValidUrl = (url: string) =>{
        return /^https?:\/\/\S+\.\S+/.test(url);
    };

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) =>{
        if((e.key === 'Enter' || e.key === ',') && tagInput.trim()!==''){
            e.preventDefault();
            const newTag = tagInput.trim().toLowerCase();

            if(!tags.includes(newTag)){
                setTags([...tags,newTag]);
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) =>{
        setTags(tags.filter(tag =>tag !== tagToRemove))
    };

    const handleAddLink = ()=>{
        if(!isValidUrl(linkInput)){
            alert('Please eneter a valid URL');
            return;
        }
        const newBookmark = {
            url: linkInput,
            tags: tags,
        };

        console.log('Saved Bookmark:',newBookmark);
        setLinkInput('');
        setTags([]);
        setTagInput('');
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
            <button onClick={handleAddLink} style={{padding:10,width:'100%'}}>
                + Add
            </button>
        </div>        
    );
};

export default LinkForm;
