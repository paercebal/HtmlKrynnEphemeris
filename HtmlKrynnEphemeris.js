//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

function byId(p_id)
{
   const o = document.getElementById(p_id);
   if(o == null) alert("Id [" + p_id + "] not found");
   return o;
}

function getValueById(p_id)
{
    return byId(p_id).value;
}

function getIntegerById(p_id)
{
    return parseInt(byId(p_id).value, 10);
}

function setValueById(p_id, p_value)
{
    byId(p_id).value = p_value;
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////









//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

function rotate_moon_phase(p_moon_phase, p_rotation)
{
   p_moon_phase += p_rotation;
   
   while(p_moon_phase >= 1) p_moon_phase -= 1;
   while(p_moon_phase < 0) p_moon_phase += 1;
   
   return p_moon_phase;
}

function deduce_canvas_moon_coordinates(p_is_taladas, p_is_nuitari, p_moon_phase, p_moon_phase_max, p_radius, p_moon_image_size)
{
   const canvas_x_size = byId("ID_canvas").width;
   const canvas_y_size = byId("ID_canvas").height;
   const canvas_radius = canvas_x_size / 2;
   const canvas_center_x = canvas_radius;
   const canvas_center_y = canvas_radius;
   const moon_image_half_size = p_moon_image_size / 2;

   let moon_phase = p_moon_phase / p_moon_phase_max;
   
   if(p_is_nuitari && (!p_is_taladas))
   {
      moon_phase = rotate_moon_phase(moon_phase, 0.1875);
   }
   else
   {
      moon_phase = rotate_moon_phase(moon_phase, 0.25);
   }

   const moon_center_x = p_radius * Math.cos(moon_phase * 2 * Math.PI);
   const moon_center_y = p_radius * Math.sin(moon_phase * 2 * Math.PI);

   const moon_pos_x = canvas_center_x + moon_center_x - moon_image_half_size;
   const moon_pos_y = canvas_y_size - (canvas_center_y + moon_center_y + moon_image_half_size);
   
   var str_alert = "";
   str_alert += "canvas_x_size: " + canvas_x_size + "\n";
   str_alert += "canvas_y_size: " + canvas_y_size + "\n";
   str_alert += "canvas_radius: " + canvas_radius + "\n";
   str_alert += "canvas_center_x: " + canvas_center_x + "\n";
   str_alert += "canvas_center_y: " + canvas_center_y + "\n";
   str_alert += "moon_image_half_size: " + moon_image_half_size + "\n";
   str_alert += "moon_phase: " + moon_phase + "\n";
   str_alert += "moon_center_x: " + moon_center_x + "\n";
   str_alert += "moon_center_y: " + moon_center_y + "\n";
   str_alert += "moon_pos_x: " + moon_pos_x + "\n";
   str_alert += "moon_pos_y: " + moon_pos_y + "\n";
   //alert(str_alert);

   return { x : moon_pos_x, y : moon_pos_y};
}

function draw_one_moon(p_is_taladas, p_is_nuitari, p_name, p_moon_phase, p_moon_phase_max, p_radius, p_moon_image_size)
{
   const ctx = get_map_context();

   // background map
   const moon_img = document.getElementById("ID_image" + p_name);
   
   const moon_pos = deduce_canvas_moon_coordinates(p_is_taladas, p_is_nuitari, p_moon_phase, p_moon_phase_max, p_radius, p_moon_image_size);
   
   ctx.drawImage(moon_img, moon_pos.x, moon_pos.y);
}

function draw_sun(p_is_taladas, p_sun_phase)
{
   draw_one_moon(p_is_taladas, false, "Sun", p_sun_phase, 336, 365, 48);
}

function draw_moon_solinari(p_is_taladas, p_moon_phase)
{
   draw_one_moon(p_is_taladas, false, "Solinari", p_moon_phase, 36, 317, 48);
}

function draw_moon_lunitari(p_is_taladas, p_moon_phase)
{
   draw_one_moon(p_is_taladas, false, "Lunitari", p_moon_phase, 28, 268, 48);
}

function draw_moon_nuitari(p_is_taladas, p_moon_phase)
{
   draw_one_moon(p_is_taladas, true, "Nuitari", p_moon_phase, 8, 220, 48);
}

function get_map_context()
{
   const canvas = byId("ID_canvas");
   const ctx = canvas.getContext("2d");
   return ctx;
}

function draw_map(p_is_taladas, p_sun_phase, p_solinari_phase, p_lunitari_phase, p_nuitari_phase)
{
   const ctx = get_map_context();
   
   // color background
   ctx.fillStyle = "#000a1c";
   ctx.fillRect(0, 0, 800, 800);
   
   // background map
   const map_src = (p_is_taladas) ? "ID_imageMapTaladas" : "ID_imageMapClassic";
   const map_img = document.getElementById(map_src);
   ctx.drawImage(map_img, 0, 0);

   draw_sun(p_is_taladas, p_sun_phase);
   draw_moon_solinari(p_is_taladas, p_solinari_phase);
   draw_moon_lunitari(p_is_taladas, p_lunitari_phase);
   draw_moon_nuitari(p_is_taladas, p_nuitari_phase);
}

