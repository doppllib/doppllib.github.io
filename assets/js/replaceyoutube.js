function swapYoutube()
{
    var elementsByTagName = document.getElementsByTagName("a");
    for(var i =0; i<elementsByTagName.length; i++)
    {
        if(elementsByTagName[i].href.includes("https://www.youtube.com/watch?v="))
        {
            elementsByTagName[i].href.substring("https://www.youtube.com/watch?v=".length)

        }
    }
}