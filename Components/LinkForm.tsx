import React, {useState} from 'react';

const LinkForm: React.FC = () => {
    const [linkInput, setLinkInput] = useState('');

    const isValidUrl = (url: string) =>{
        return /^https?:\/\/\S+\.\S+/.test(url);
    };

    const handleAddLink = ()=>{
        if(!isValidUrl(linkInput)){
            alert('Please eneter a valid URL');
            return;
        }

        console.log('Link saved:',linkInput);
        setLinkInput('');
    };

    return(
        <div>
            <input type="text"
            placeholder="paste you link here..."
            value={linkInput} 
            onChange={(e) => setLinkInput(e.target.value)}
            />
            <button onClick={handleAddLink}>Add Link</button>
        </div>        
    );
};

export default LinkForm;
