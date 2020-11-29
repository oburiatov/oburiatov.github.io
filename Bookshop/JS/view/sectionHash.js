class SectionHash {
getCurrentSectionHash(uniqueID, data)
{
    let hash=''
    let section=''

    data.map((catalogname) =>{
         catalogname[Object.keys(catalogname)].map((blockelement)=>{

            if (blockelement.uniqueID==uniqueID)
            {
                hash=blockelement.url;
                section=Object.keys(catalogname)[0];

            }

        })

     })

    return {hash,
        section};
}


}

export default SectionHash;