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

function setComboBoxValueById(p_id, p_value, p_value_default)
{
   const cb = byId(p_id);
   let index_default = -1;
   let index_found = -1;

   for(let i = 0, iMax = cb.options.length; i < iMax; ++i)
   {
      const o = cb.options[i];
      
      if(o.value == p_value_default)
      {
         index_default = i;
      }
      
      if(o.value == p_value)
      {
         index_found = i;
         break;
      }
   }
   
   if(index_found != -1)
   {
      cb.selectedIndex = index_found;
   }
   else if(index_default != -1)
   {
      cb.selectedIndex = index_default;
   }
}

function getComboBoxValueById(p_id, p_value_default)
{
   const cb = byId(p_id);
   let index_default = -1;
   let index_found = -1;
   
   if(cb.selectedIndex == -1)
   {
      return p_value_default;
   }
   else
   {
      return cb.options[cb.selectedIndex].value;
   }
}

function modulo(n, m)
{
  return ((n % m) + m) % m;
}

///////////////////////////////////////////////////////////////////
//
// Raistlin passed the Test in 346 AC
// (see: https://dragonlance.fandom.com/wiki/346_AC)
//
// THE SOULFORGE: BOOK 6, Chapter 1
//
// IT WAS THE SIXTH DAY OF THE SEVENTH MONTH.
// 
// [...]
//
// Above the Tower, silver Solinari and red Lunitari shone brightly.
// Nuitari was there as well, a dark hole in the constellations. The three
// moons were full this night, as was necessary for the Test.
//
// THE SOULFORGE: BOOK 6, Chapter 2
//
// On the seventh day of the seventh month, seven magi were ushered
// into a large courtyard at the base of the Tower of High Sorcery.
//
// CONCLUSION
//
// The 7th day of the 7th month of 346 AC was a Night of the Eye.
//
// Date: 346-07-07
// DayZero: S6:L22:N2
   
///////////////////////////////////////////////////////////////////
//
// NIGHT OF THE EYE 2
//
// Autumn Twilight 15th : Night of the Eye. Dragonarmy force attack Northgate
//
// (Dragons of Autumn.pdf, p8)
//
// This is 351-10-15
//
// Date: 351-10-15
// DayZero: S34:L14:N6

///////////////////////////////////////////////////////////////////
//
// NIGHT OF THE EYE 3
//
// DRAGONS OF THE HOURGLASS MAGE: BOOK 3, Chapter 2
//
// “23rd Day, Month of Mishamont, Year 352 AC”
// [...]
// “Tomorrow night, the Night of the Eye, [...]”
//
// DRAGONS OF THE HOURGLASS MAGE: BOOK 3, Chapter 3
//
// “24th Day, Month of Mishamont, Year 352 AC”
// [...]
// “Tonight, the Night of the Eye.”
//
// Date: 352-03-24
// DayZero: S29:L5:N1

class moons_phases_data
{
   constructor(p_solinari_day_zero, p_lunitari_day_zero, p_nuitari_day_zero)
   {
      this.m_solinari_day_zero = p_solinari_day_zero;
      this.m_lunitari_day_zero = p_lunitari_day_zero;
      this.m_nuitari_day_zero = p_nuitari_day_zero;
      this.m_night_of_the_eye = "Custom";
      
      if(   (this.m_solinari_day_zero == 6)     &&
            (this.m_lunitari_day_zero == 22)    &&
            (this.m_nuitari_day_zero == 2)      )
      {
         this.m_night_of_the_eye = "TheSoulforgeNovel";
      }
      else if( (this.m_solinari_day_zero == 34)    &&
               (this.m_lunitari_day_zero == 14)    &&
               (this.m_nuitari_day_zero == 6)      )
      {
         this.m_night_of_the_eye = "AutumnTwilightRPG";
      }
      else if( (this.m_solinari_day_zero == 29)    &&
               (this.m_lunitari_day_zero == 5)     &&
               (this.m_nuitari_day_zero == 1)      )
      {
         this.m_night_of_the_eye = "HourglassMageNovel";
      }
   }
   
   static create_from_label(p_label)
   {
      if(p_label == "TheSoulforgeNovel")
      {
         return new moons_phases_data(6, 22, 2);
      }
      else if(p_label == "AutumnTwilightRPG")
      {
         return new moons_phases_data(34, 14, 6);
      }
      else if(p_label == "HourglassMageNovel")
      {
         return new moons_phases_data(29, 5, 1);
      }
      
      return null;
   }
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

function HephemerisData()
{
   //this.c_sunPhaseAtDayZero = 0;
   
   //this.c_solinariPhaseAtDayZero = 34; //13;
   //this.c_lunitariPhaseAtDayZero = 26; //21;
   //this.c_nuitariPhaseAtDayZero = 6; //1;
   
   this.c_solinariPhaseAtDayZero = 6; //34; //13;
   this.c_lunitariPhaseAtDayZero = 22; //26; //21;
   this.c_nuitariPhaseAtDayZero = 2; //6; //1;

   this.m_solinariPhaseAtDayZero = this.c_solinariPhaseAtDayZero;
   this.m_lunitariPhaseAtDayZero = this.c_lunitariPhaseAtDayZero;
   this.m_nuitariPhaseAtDayZero = this.c_nuitariPhaseAtDayZero;

   this.c_sunPhasePeriod = 336;
   this.c_solinariPhasePeriod = 36;
   this.c_lunitariPhasePeriod = 28;
   this.c_nuitariPhasePeriod = 8;

   this.c_weekLength = 7;
   this.c_monthLength = 28;
   this.c_yearLength = 336;
   
   this.m_is_debug_visible = false;
   this.m_is_taladas = false;
   
   // 119842 : Tuesday 3rd September 357 AC [1319 IA] [2957 EC] [3356 KToL]
   this.m_epochDay = 119842;
   this.m_latitude = -45;
   
   this.m_skychart_starfield_intensity = 2;
   this.m_skychart_grid_intensity = 3;
   this.m_moon_phases_decoration_intensity = 0;

   this.m_sun_chart_enabled = true;
   this.m_sky_chart_enabled = true;
}

HephemerisData.prototype.getMoonPhasesDecorationIntensity = function()
{
   return this.m_moon_phases_decoration_intensity;
}

HephemerisData.prototype.getSkyChartStarfieldIntensity = function()
{
   return this.m_skychart_starfield_intensity;
}

HephemerisData.prototype.getSkyChartGridIntensity = function()
{
   return this.m_skychart_grid_intensity;
}

HephemerisData.prototype.getSunPhase = function()
{
   return modulo(this.m_epochDay, this.c_sunPhasePeriod);
}

HephemerisData.prototype.getSolinariPhase = function()
{
   return modulo(this.m_epochDay + this.m_solinariPhaseAtDayZero, this.c_solinariPhasePeriod);
}

HephemerisData.prototype.getLunitariPhase = function()
{
   return modulo(this.m_epochDay + this.m_lunitariPhaseAtDayZero, this.c_lunitariPhasePeriod);
}

HephemerisData.prototype.getNuitariPhase = function()
{
   return modulo(this.m_epochDay + this.m_nuitariPhaseAtDayZero, this.c_nuitariPhasePeriod);
}

HephemerisData.prototype.toString = function()
{
   let a = [];

   //a.push("- ", "c_sunPhaseAtDayZero", ": ", this.c_sunPhaseAtDayZero,"\n");
   a.push("- ", "m_solinariPhaseAtDayZero", ": ", this.m_solinariPhaseAtDayZero,"\n");
   a.push("- ", "m_lunitariPhaseAtDayZero", ": ", this.m_lunitariPhaseAtDayZero,"\n");
   a.push("- ", "m_nuitariPhaseAtDayZero", ": ", this.m_nuitariPhaseAtDayZero,"\n");
   a.push("- ", "c_sunPhasePeriod", ": ", this.c_sunPhasePeriod,"\n");
   a.push("- ", "c_solinariPhasePeriod", ": ", this.c_solinariPhasePeriod,"\n");
   a.push("- ", "c_lunitariPhasePeriod", ": ", this.c_lunitariPhasePeriod,"\n");
   a.push("- ", "c_nuitariPhasePeriod", ": ", this.c_nuitariPhasePeriod,"\n");
   a.push("- ", "c_weekLength", ": ", this.c_weekLength,"\n");
   a.push("- ", "c_monthLength", ": ", this.c_monthLength,"\n");
   a.push("- ", "c_yearLength", ": ", this.c_yearLength,"\n");
   a.push("- ", "m_is_debug_visible", ": ", this.m_is_debug_visible,"\n");
   a.push("- ", "m_is_taladas", ": ", this.m_is_taladas,"\n");
   a.push("- ", "m_epochDay", ": ", this.m_epochDay,"\n");
   a.push("- ", "m_latitude", ": ", this.m_latitude,"\n");
   a.push("- ", "getSunPhase()", ": ", this.getSunPhase(),"\n");
   a.push("- ", "getSolinariPhase()", ": ", this.getSolinariPhase(),"\n");
   a.push("- ", "getLunitariPhase()", ": ", this.getLunitariPhase(),"\n");
   a.push("- ", "getNuitariPhase()", ": ", this.getNuitariPhase(),"\n");

   return a.join("");
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

function convert_dumb_day_to_calendar_day(p_day)       { return p_day - 1; }
function convert_calendar_day_to_dumb_day(p_day)       { return p_day + 1; }
function convert_dumb_month_to_calendar_month(p_month) { return p_month - 1; }
function convert_calendar_month_to_dumb_month(p_month) { return p_month + 1; }
function convert_dumb_year_to_calendar_year(p_year)    { return (p_year >= 1) ? p_year - 1 : p_year; }
function convert_calendar_year_to_dumb_year(p_year)    { return (p_year >= 0) ? p_year + 1 : p_year; }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

function rotate_body_phase(p_body_phase, p_initial_rotation_0_to_1)
{
   p_body_phase += p_initial_rotation_0_to_1;
   
   while(p_body_phase >= 1) p_body_phase -= 1;
   while(p_body_phase < 0) p_body_phase += 1;
   
   return p_body_phase;
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

function deduce_canvas_sky_chart_coordinates(p_sun_phase, p_sun_phase_max, p_sky_chart_image_size)
{
   const canvas_x_size = byId("ID_canvas").width;
   const canvas_y_size = byId("ID_canvas").height;
   const canvas_radius = canvas_x_size / 2;
   const canvas_center_x = canvas_radius;
   const canvas_center_y = canvas_radius;
   const sky_chart_image_half_size = p_sky_chart_image_size / 2;

   let sky_chart_phase = p_sun_phase / p_sun_phase_max;
   // multiplied by -1 so the two dragon constellations appear
   // to turn around the book as time passes.
   let sky_chart_phase_radian = -1 * sky_chart_phase * 2 * Math.PI;
   
   var str_alert = "";
   str_alert += "canvas_x_size: " + canvas_x_size + "\n";
   str_alert += "canvas_y_size: " + canvas_y_size + "\n";
   str_alert += "canvas_radius: " + canvas_radius + "\n";
   str_alert += "canvas_center_x: " + canvas_center_x + "\n";
   str_alert += "canvas_center_y: " + canvas_center_y + "\n";
   str_alert += "sky_chart_image_half_size: " + sky_chart_image_half_size + "\n";
   str_alert += "sky_chart_phase: " + sky_chart_phase + "\n";
   str_alert += "sky_chart_phase_radian: " + sky_chart_phase_radian + "\n";
   //str_alert += "moon_center_y: " + moon_center_y + "\n";
   //str_alert += "moon_pos_x: " + moon_pos_x + "\n";
   //str_alert += "moon_pos_y: " + moon_pos_y + "\n";
   //alert(str_alert);

   return { rotation_radian : sky_chart_phase_radian };
}

function draw_sky_chart(p_data, p_sun_phase, p_sun_phase_max, p_sky_chart_image_size, p_position_latitude)
{
   const canvas_x_size = byId("ID_canvas").width;
   const canvas_y_size = byId("ID_canvas").height;
   const ctx = get_map_context();

   // sky chart map
   const sky_chart_img = document.getElementById("ID_imageSkyChart");
   const sky_chart_grid_img = document.getElementById("ID_imageSkyChartGrid");
   const sky_chart_starfield_img = document.getElementById("ID_imageSkyChartStarfield");

   const sky_chart_pos = deduce_canvas_sky_chart_coordinates(p_data.getSunPhase(), p_sun_phase_max, p_sky_chart_image_size);
   
   const vertical_offset = (p_position_latitude + 90) / 90 * 200;
   
   // Rotated rectangle
   ctx.translate(canvas_x_size/2, canvas_y_size/2);
   ctx.translate(0, -vertical_offset);
   //ctx.rotate(90 * Math.PI / 180);
   ctx.rotate(sky_chart_pos.rotation_radian);
   ctx.translate(0, +vertical_offset);
   ctx.translate(-canvas_x_size/2, -canvas_y_size/2);

   const sky_chart_starfield_intensity = p_data.getSkyChartStarfieldIntensity();
   const sky_chart_grid_intensity = p_data.getSkyChartGridIntensity();

   for(let i = 0; i < sky_chart_starfield_intensity; ++i)
   {
      ctx.drawImage(sky_chart_starfield_img, 0, -vertical_offset);
   }

   for(let i = 0; i < sky_chart_grid_intensity; ++i)
   {
      ctx.drawImage(sky_chart_grid_img, 0, -vertical_offset);
   }
   
   ctx.drawImage(sky_chart_img, 0, -vertical_offset);

   // Reset transformation matrix to the identity matrix
   ctx.setTransform(1, 0, 0, 1, 0, 0);   
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

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
      moon_phase = rotate_body_phase(moon_phase, 0.1875);
   }
   else if (p_is_sun)
   {
      moon_phase = rotate_body_phase(moon_phase, (10 / 336) -0.25);
   }
   else
   {
      moon_phase = rotate_body_phase(moon_phase, 0.25);
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
   draw_one_moon(p_is_taladas, true, false, "Sun", p_sun_phase, 336, 367, 48);
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

function draw_map(p_data)
{
   // p_data.m_sky_chart_enabled = false;
   // p_data.m_sun_chart_enabled = false;
   
   const background_color = "#000a1c";
   
   const ctx = get_map_context();
   
   // color background
   ctx.fillStyle = background_color;
   ctx.fillRect(0, 0, 800, 800);
   
   // sky chart map
   if(p_data.m_sky_chart_enabled)
   {
      draw_sky_chart(p_data, p_data.getSunPhase(), p_data.c_sunPhasePeriod, 800, p_data.m_latitude);

      // color background
      ctx.fillStyle = background_color;
      ctx.fillRect(0, 0, 800, 200);
      ctx.fillRect(0, 600, 800, 200);
      ctx.fillRect(0, 0, 200, 800);
      ctx.fillRect(600, 0, 200, 800);

      // horizon map
      const horizon_img = document.getElementById("ID_imageHorizon");
      ctx.drawImage(horizon_img, 0, 0);

      // compass map
      const compass_img = document.getElementById("ID_imageCompass");
      ctx.drawImage(compass_img, 0, 0);
   }

   // background map
   const map_src = (p_data.m_is_taladas) ? "ID_imageMapTaladas" : "ID_imageMapClassic";
   const map_img = document.getElementById(map_src);
   ctx.drawImage(map_img, 0, 0);

   // moon phases map
   const moon_phases_decoration_img = document.getElementById("ID_imageMoonPhasesDecoration");
   
   const moon_phases_decoration_intensity = p_data.getMoonPhasesDecorationIntensity();
   for(let i = 0; i < moon_phases_decoration_intensity; ++i)
   {
      ctx.drawImage(moon_phases_decoration_img, 0, 0);
   }

   if(p_data.m_sun_chart_enabled)
   {
      const compass_img = document.getElementById("ID_imageSunPhases");
      ctx.drawImage(compass_img, 0, 0);
      draw_sun(p_data.m_is_taladas, p_data.getSunPhase());
   }
   
   draw_moon_solinari(p_data.m_is_taladas, p_data.getSolinariPhase());
   draw_moon_lunitari(p_data.m_is_taladas, p_data.getLunitariPhase());
   draw_moon_nuitari(p_data.m_is_taladas, p_data.getNuitariPhase());
}

function get_calendar_date_as_string_by_origin(p_origin, p_year, p_month, p_day, p_display_legacy)
{
    function week_day_name(p_origin, p_day)
    {
        const day = modulo(p_day, 7);
        const origin_weekday = g_weekdays_map[p_origin][day];
        return origin_weekday;
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
    
    function month_name(p_origin, p_month)
    {
        const origin_month = g_months_map[p_origin][p_month];
        return origin_month;
    }
    
    function year_name(p_year)
    {
        const ac_pc_year = convert_calendar_year_to_dumb_year(p_year);
        const str_ac_prefix = (p_year >= 0) ? " AC" : " PC";
        return ac_pc_year + str_ac_prefix;
    }
    
    function legacy_year_names(p_year)
    {
        // Istar Calendar
        const str_ia_suffix = " [" + (p_year + 963) + " IA]";

        // Ergothian Calendar
        const str_ec_suffix = " [" + (p_year + 2601) + " EC]";
       
        // Kender Calendar
        const str_ktol_suffix = " [" + (p_year + 3000) + " KToL]";
       
        return str_ia_suffix + str_ec_suffix + str_ktol_suffix;
    }
    
    let str_calendar_date = week_day_name(p_origin, p_day);
    str_calendar_date += " " + day_name(p_day);
    str_calendar_date += " " + month_name(p_origin, p_month);
    str_calendar_date += " " + year_name(p_year);
    
    if(p_display_legacy)
    {
       str_calendar_date += " " + legacy_year_names(p_year);
    }
    
    return str_calendar_date;
}

