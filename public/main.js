document.getElementById('updateButton').addEventListener('click', updateEntry) // 2:50:00
document.getElementById('deleteButton').addEventListener('click', deleteEntry) // 3:50:00

async function updateEntry() {
    try {
        const response = await fetch('updateEntry', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: document.getElementsByName('name')[0].value,
                speciesName: document.getElementsByName('speciesName')[0].value,
                features: document.getElementsByName('features')[0].value,
                homeWorld: document.getElementsByName('homeWorld')[0].value,
                image: document.getElementsByName('image')[0].value,
                interestingFact: document.getElementsByName('interestingFact')[0].value,
                notableExamples: document.getElementsByName('notableExamples')[0].value
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()

    } catch(err){
        console.log(err)
    }
}

async function deleteEntry(){
    const input = document.getElementById('deleteInput')
    try{
        const response = await fetch('deleteEntry', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: input.value
            })
        })
        const data = await response.json()
        location.reload()
    } catch(err){
        console.log(err)
    }    
}