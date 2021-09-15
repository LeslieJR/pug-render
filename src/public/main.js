async function toDelete(user) {
    console.log(user._id)
    await fetch(`http://localhost:4040/api/remove/${user._id}`, {
        method: 'delete'
    })
    window.location.reload();
    
}