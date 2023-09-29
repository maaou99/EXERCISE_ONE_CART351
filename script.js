// "make a mesh gradient in js", ChatGPT
//make a polygon in js, ChatGPT

window.onload = function () {

   //if trigged, the first question will appear
   document.getElementById("start").addEventListener('click', createForms)

   //if triggered, the form will reset to allow the second question to appear
   document.getElementById("firstForm").addEventListener('click', resetForm)


   let shape = document.getElementById("shapeCanvas")

   //if triggered the shape will appear and start animating 
   shape.addEventListener("click", () => {
      shape.style.animationPlayState = 'running'
      console.log('hovering')
   })

   //form has not been completed
   let formCompleted = false

   //gets div of the form 
   const fadeDiv = document.getElementById("form1");

   //number of sides the polygon will have
   let numVertices;

   function createForms() {

      //this function creates the first and second form
      
      //remove start page
      document.getElementById('container').style.display = 'none'

      //randomize the position of the form
      const randomleft = Math.floor(Math.random() * (900 - 100 + 1) + 100)

      fadeDiv.style.left = randomleft + "px"

      // Trigger a reflow to apply the CSS changes immediately
      void fadeDiv.offsetWidth;

      // Increase the opacity to 1 (fully visible)
      fadeDiv.style.opacity = "1";

      if (formCompleted) {

         //creates second form
         document.getElementById("text-form").innerHTML = 'please provide RGB values'
         document.getElementById('vertices').remove()
         document.getElementById('form1').style.height = "430px"
         document.getElementById("rgb-values").style.display = "block"
         document.getElementById("firstForm").style.margin = "10% 65%"
         document.getElementById("firstForm").value = "GENERATE"

         //the second form has not been completed 
         formCompleted = false
      }


   }

   function resetForm() {

   

      if (document.getElementById("firstForm").value === "GENERATE") {

         //store values of the second form
         const rValue = document.getElementById("r").value
         const gValue = document.getElementById("g").value
         const bValue = document.getElementById("b").value

         //check if values are rgb values
         if (rValue >= 0 && rValue <= 255 &&
            gValue >= 0 && gValue <= 255 &&
            bValue >= 0 && bValue <= 255) {

            //the form is completed
            formCompleted = true

            //remove opacity 
            fadeDiv.style.opacity = "0";
      
            createMeshGradient(rValue, gValue, bValue)
          
            //initialize a new instance of a polygon 
            let polygon = new drawPolygon(numVertices)

            polygon.drawPolygon()

         } else {
            alert('please enter a number between 0 and 255')
         }

      } else if (document.getElementById("firstForm").value === "NEXT") {

         //first form 
         //stores values
         numVertices = document.getElementById('vertices').value

         //to check the validity of number 
         if (numVertices > 0 && numVertices < 10) {

            //the form is completed
            formCompleted = true

            fadeDiv.style.opacity = "0";

            setTimeout(createForms, 1000)

         } else {
            alert("Please provide a number between 1 and 10")
         }

      }

   }

   function createMeshGradient(r, g, b) {
      //from chatGPT
      const canvas = document.getElementById('mesh-gradient');
      const ctx = canvas.getContext('2d');

      // Define the colors for the mesh gradient

      let color1 = "rgb(" + r + "," + g + "," + b + ")"
      let color2 = "rgb(" + Math.floor((r * Math.random())) + "," + Math.floor((g * Math.random())) + "," + Math.floor((b * Math.random())) + ")"
      let color3 = "rgb(" + Math.floor((r * Math.random())) + "," + Math.floor((g * Math.random())) + "," + Math.floor((b * Math.random())) + ")"
      
      const colors = [color1, color2, color3]; // Change these colors
      
      // Create a gradient object with the specified colors
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      colors.forEach((color, index) => {
         gradient.addColorStop(index / (colors.length - 1), color);
      });

      // Fill the canvas with the mesh gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      console.log('mesh created')
   }

   class drawPolygon {

      constructor(vertices) {
         this.numVertices = vertices
         this.xOffset = Math.floor(Math.random() * 100)
         this.yOffset = Math.floor(Math.random() * 100)
      }


      drawPolygon() {

         document.getElementById('homepage').remove()
         document.getElementById('question').remove()

         // Get the canvas element and its context
         let canvas = document.getElementById("shapeCanvas");
         let ctx = canvas.getContext("2d");

         // Get the number of vertices from the input field
         let vertexCount = this.numVertices

         // Clear the canvas
         ctx.clearRect(0, 0, canvas.width + this.xOffset, canvas.height + this.yOffset);

         // Define the radius and center of the polygon
         let radius = 100;
         let centerX = canvas.width / 2 + this.xOffset
         let centerY = canvas.height / 2 + this.yOffset

         // Calculate the angle between vertices
         let angle = (2 * Math.PI) / vertexCount;

         // Begin drawing the polygon
         ctx.beginPath();

         ctx.moveTo(centerX + radius, centerY);
         ctx.strokeStyle = 'white';
         ctx.lineWidth = 3

         for (let i = 1; i <= vertexCount; i++) {

            let x = centerX + radius * Math.cos(i * angle);
            let y = centerY + radius * Math.sin(i * angle);
            ctx.lineTo(x, y);

         }

         ctx.closePath();
         ctx.stroke();
         console.log(this.numVertices)

         //gets html element and animates it after 2 seconds

       
         
     

      }




   }


}

