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

function modulo(n, m)
{
  return ((n % m) + m) % m;
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

function convert_epoch_day_to_calendar_day(p_epoch_day)
{
   // note: year, month and day all start at zero

   const year = Math.floor(p_epoch_day / 336);
   const year_day = p_epoch_day - (year * 336);
   
   const non_negative_year_day = modulo(year_day, 336);
   
   const month = Math.floor(non_negative_year_day / 28);
   const day = non_negative_year_day - (month * 28);
   
   //alert("p_epoch_day:" + p_epoch_day + "\nyear:" + year + "\nyear_day:" + year_day + "\nnon_negative_year_day:" + non_negative_year_day + "\nmonth:" + month + "\nday" + day);
   
   return { year : year, month : month, day, day};
}

function convert_calendar_day_to_epoch_day(p_year, p_month, p_day)
{
   // note: year, month and day all start at zero

   let days = p_year * 336;
   days += p_month * 28;
   days += p_day;

   //alert("p_year:" + p_year + "\np_month:" + p_month + "\np_day:" + p_day + "\ndays:" + days);

   
   return days;
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

function rotate_moon_phase(p_moon_phase, p_rotation)
{
   p_moon_phase += p_rotation;
   
   while(p_moon_phase >= 1) p_moon_phase -= 1;
   while(p_moon_phase < 0) p_moon_phase += 1;
   
   return p_moon_phase;
}

function deduce_canvas_moon_coordinates(p_is_taladas, p_is_sun, p_is_nuitari, p_moon_phase, p_moon_phase_max, p_radius, p_moon_image_size)
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
   else if (p_is_sun)
   {
      moon_phase = rotate_moon_phase(moon_phase, -0.25);
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

function draw_one_moon(p_is_taladas, p_is_sun, p_is_nuitari, p_name, p_moon_phase, p_moon_phase_max, p_radius, p_moon_image_size)
{
   const ctx = get_map_context();

   // background map
   const moon_img = document.getElementById("ID_image" + p_name);
   
   const moon_pos = deduce_canvas_moon_coordinates(p_is_taladas, p_is_sun, p_is_nuitari, p_moon_phase, p_moon_phase_max, p_radius, p_moon_image_size);
   
   ctx.drawImage(moon_img, moon_pos.x, moon_pos.y);
}

function draw_sun(p_is_taladas, p_sun_phase)
{
   draw_one_moon(p_is_taladas, true, false, "Sun", p_sun_phase, 336, 365, 48);
}

function draw_moon_solinari(p_is_taladas, p_moon_phase)
{
   draw_one_moon(p_is_taladas, false, false, "Solinari", p_moon_phase, 36, 317, 48);
}

function draw_moon_lunitari(p_is_taladas, p_moon_phase)
{
   draw_one_moon(p_is_taladas, false, false, "Lunitari", p_moon_phase, 28, 268, 48);
}

function draw_moon_nuitari(p_is_taladas, p_moon_phase)
{
   draw_one_moon(p_is_taladas, false, true, "Nuitari", p_moon_phase, 8, 220, 48);
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


function get_calendar_date_as_string(p_year, p_month, p_day)
{
    function week_day_name(p_day)
    {
        const day = modulo(p_day, 7);
        switch(day)
        {
            case 0: return "Sunday";
            case 1: return "Monday";
            case 2: return "Tuesday";
            case 3: return "Wednesday";
            case 4: return "Thursday";
            case 5: return "Friday";
            case 6: return "Saturday";
        }
        
        throw "Oops";
    }
    
    function day_name(p_day)
    {
        ++p_day;
        switch(p_day)
        {
            case 1: return "1st";
            case 2: return "2nd";
            case 3: return "3rd";
            default: return p_day + "th";
        }
        
        throw "Oops";
    }
    
    function month_name(p_month)
    {
        ++p_month;
        switch(p_month)
        {
            case 1: return "January";
            case 2: return "February";
            case 3: return "March";
            case 4: return "April";
            case 5: return "May";
            case 6: return "June";
            case 7: return "July";
            case 8: return "August";
            case 9: return "September";
            case 10: return "October";
            case 11: return "November";
            case 12: return "December";
        }
        
        throw "Oops";
    }
    
    function year_name(p_year)
    {
        const str_ac_prefix = p_year + ((p_year >= 0) ? " AC" : " PC");
        
        // Istar Calendar
        const str_ia_suffix = " [" + (p_year + 963) + " IA]";

        // Ergothian Calendar
        const str_ec_suffix = " [" + (p_year + 2601) + " EC]";
       
        // Kender Calendar
        const str_ktol_suffix = " [" + (p_year + 3000) + " KToL]";
       
        return str_ac_prefix + str_ia_suffix + str_ec_suffix + str_ktol_suffix;
    }
    
    let str_calendar_date = week_day_name(p_day);
    str_calendar_date += " " + day_name(p_day);
    str_calendar_date += " " + month_name(p_month);
    str_calendar_date += " " + year_name(p_year);
    
    return str_calendar_date;
}

